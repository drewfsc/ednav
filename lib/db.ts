// Import necessary modules
import mongoose from "mongoose";

// Connection string from environment variables
const MONGODB_URI = process.env.MONGODB_URI as string;

// Check if MongoDB URI is defined
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/**
 * Global variable to maintain the MongoDB connection across hot reloads in development
 */
declare global {
  var mongoose: { conn: any; promise: any } | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// After this point, cached is guaranteed to be defined
const connectionCache = cached as { conn: any; promise: any };

/**
 * Function to connect to the database
 */
export async function connectToDatabase() {
  if (connectionCache.conn) {
    return connectionCache.conn;
  }

  if (!connectionCache.promise) {
    const opts = {
      bufferCommands: false,
    };

    connectionCache.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    connectionCache.conn = await connectionCache.promise;
  } catch (e) {
    connectionCache.promise = null;
    throw e;
  }

  return connectionCache.conn;
}
