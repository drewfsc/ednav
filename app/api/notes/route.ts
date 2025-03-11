import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"

// GET all notes
export async function GET() {
  try {
    const collection = await getCollection("notes")
    const notes = await collection.find({}).toArray()

    return NextResponse.json(notes, { status: 200 })
  } catch (error) {
    console.error("Error fetching notes:", error)
    return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 })
  }
}

