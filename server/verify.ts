import { getDriver, closeDriver } from './neo4j'

async function main() {
  const driver = getDriver()
  const session = driver.session()
  try {
    const id = process.env.TEST_PART_ID || 'screw-m6x15'
    const res = await session.run(
      `MATCH (p:Part {part_id: $id}) 
       OPTIONAL MATCH (p)-[:ALTERNATIVE]->(alt:Part)
       RETURN p, collect(alt) as alts`,
      { id }
    )
    if (res.records.length === 0) {
      console.log('No part found for id', id)
      process.exitCode = 2
      return
    }
    const rec = res.records[0]
    const p = rec.get('p').properties
    const alts = (rec.get('alts') as any[]).map(n => n.properties)
    console.log(JSON.stringify({ part: p, alternatives: alts }, null, 2))
  } finally {
    await session.close()
    await closeDriver()
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
