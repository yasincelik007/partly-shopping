import neo4j, { Driver } from 'neo4j-driver'

const uri = process.env.NEO4J_URI || 'neo4j://localhost:7687'
const user = process.env.NEO4J_USER || 'neo4j'
const password = process.env.NEO4J_PASSWORD || 'neo4j'

let driver: Driver | null = null

export function getDriver(): Driver {
  if (!driver) {
    driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
  }
  return driver
}

export async function closeDriver() {
  if (driver) {
    await driver.close()
    driver = null
  }
}
