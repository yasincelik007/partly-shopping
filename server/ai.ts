export type MatchInput = {
  mesh_id?: string
  text?: string
  ocr_text?: string
  pdf_text?: string
}

export type Features = {
  tokens: string[]
  oemCandidates: string[]
}

const OEM_REGEX = /\b[A-Z]{2,4}-?\d{3,6}-?[A-Z]?\b/g

export function extractFeatures(input: MatchInput): Features {
  const corpus = [input.text, input.ocr_text, input.pdf_text].filter(Boolean).join(' ')
  const upper = corpus.toUpperCase()
  const oemCandidates = Array.from(new Set(upper.match(OEM_REGEX) || []))
  const tokens = upper
    .replace(/[^A-Z0-9 ]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2 && t.length < 32)
  return { tokens, oemCandidates }
}

export type MatchResult = {
  oem?: string
  confidence: number
  rationale: string[]
}

export function scoreMatch(dbItem: any, feats: Features): MatchResult {
  const rationale: string[] = []
  let score = 0.0

  if (dbItem.oem_code && feats.oemCandidates.includes(dbItem.oem_code.toUpperCase())) {
    score += 0.8
    rationale.push('Exact OEM code match')
  }

  const name = `${dbItem.name || ''} ${dbItem.part_id || ''}`.toUpperCase()
  const hit = feats.tokens.filter(t => name.includes(t)).length
  if (hit > 0) {
    const add = Math.min(0.15, 0.05 * hit)
    score += add
    rationale.push(`Token overlap x${hit}`)
  }

  score = Math.min(score, 0.97)
  return {
    oem: dbItem.oem_code,
    confidence: Number(score.toFixed(2)),
    rationale,
  }
}
