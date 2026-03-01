import Fastify from 'fastify'
import { getDriver } from './neo4j'
import { extractFeatures, scoreMatch, MatchInput } from './ai'

const fastify = Fastify({ logger: true })

fastify.get('/health', async () => {
  return { ok: true }
})

fastify.post('/ai/match', async (req, reply) => {
  const body = req.body as MatchInput
  const feats = extractFeatures(body || {})
  const driver = getDriver()
  const session = driver.session()
  try {
    // Pull candidate parts by OEM or token hints
    const res = await session.run(
      `
      MATCH (p:Part)
      WHERE ($oems = [] OR toUpper(p.oem_code) IN $oems)
         OR any(t IN $tokens WHERE toUpper(p.name) CONTAINS t OR toUpper(p.part_id) CONTAINS t)
      RETURN p
      LIMIT 25
      `,
      { oems: feats.oemCandidates, tokens: feats.tokens }
    )
    const candidates = res.records.map(r => r.get('p').properties)
    const scored = candidates
      .map((c: any) => ({ part: c, score: scoreMatch(c, feats) }))
      .sort((a, b) => b.score.confidence - a.score.confidence)

    const top = scored[0]?.score
    return {
      input: body,
      features: feats,
      best: top || { confidence: 0, rationale: [] },
      candidates: scored.slice(0, 5),
    }
  } finally {
    await session.close()
  }
})

fastify.get('/part/:id', async (req, reply) => {
  const id = (req.params as any).id as string
  const driver = getDriver()
  const session = driver.session()
  try {
    const result = await session.run(
      `
      MATCH (p:Part {part_id: $id})
      OPTIONAL MATCH (p)-[:ALTERNATIVE]->(alt:Part)
      OPTIONAL MATCH (p)-[:RELATES_TO]->(rel:Part)
      RETURN p, collect(DISTINCT alt) AS alternatives, collect(DISTINCT rel) AS related
      `,
      { id }
    )
    if (result.records.length === 0) {
      return reply.code(404).send({ error: 'Not found' })
    }
    const rec = result.records[0]
    const p = rec.get('p').properties
    const alternatives = (rec.get('alternatives') as any[]).map(n => n.properties)
    const related = (rec.get('related') as any[]).map(n => n.properties)
    return { part: p, alternatives, related }
  } finally {
    await session.close()
  }
})

const port = Number(process.env.PORT || 4000)
fastify.listen({ port, host: '0.0.0.0' })
  .then(addr => {
    fastify.log.info(`Server on ${addr}`)
  })
  .catch(err => {
    fastify.log.error(err)
    process.exit(1)
  })
