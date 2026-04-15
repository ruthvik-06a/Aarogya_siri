import { MongoClient, type Db } from "mongodb"

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function getDb(): Promise<Db> {
  if (cachedClient && cachedDb) {
    return cachedDb
  }

  const uri = process.env.MONGO_URI // ✅ FIXED
  if (!uri) {
    throw new Error("Please define the MONGO_URI environment variable")
  }

  const client = new MongoClient(uri)
  await client.connect()

  const db = client.db("avani_organics") // ✅ FIXED
  cachedClient = client
  cachedDb = db

  return db
}