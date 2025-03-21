import { MongoClient, type Db } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env")
}

if (!process.env.MONGODB_DB) {
  throw new Error("Please add your MongoDB Database name to .env")
}

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase() {
  // If we already have a connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  // Create a new connection
  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db(dbName)

  // Cache the connection
  cachedClient = client
  cachedDb = db

  return { client, db }
}

// Helper function to get a collection
export async function getCollection(collectionName: string) {
  const { db } = await connectToDatabase()
  return db.collection(collectionName)
}

