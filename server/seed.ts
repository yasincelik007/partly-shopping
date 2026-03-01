import { readFileSync } from 'fs'
import { join } from 'path'
import { getDriver, closeDriver } from './neo4j'

async function main() {
  const driver = getDriver()
  const session = driver.session()
  try {
    const schema = readFileSync(join(__dirname, 'cypher', 'schema.cypher'), 'utf-8')
    const seed = readFileSync(join(__dirname, 'cypher', 'seed_ducati.cypher'), 'utf-8')
    await session.run(schema)
    await session.run(seed)
    console.log('Schema created and Ducati dataset seeded.')
  } finally {
    await session.close()
    await closeDriver()
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
