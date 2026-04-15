import { MongoClient, Db } from "mongodb"

const uri = process.env.MONGO_URI!

if (!uri) {
  throw new Error("Please define MONGO_URI in .env.local")
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri)
  global._mongoClientPromise = client.connect()
}

clientPromise = global._mongoClientPromise

export async function getDb(): Promise<Db> {
  const client = await clientPromise
  return client.db("avani_organics") // ✅ your DB name
}