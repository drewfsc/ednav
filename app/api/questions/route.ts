import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"

// GET all questions
export async function GET() {
  try {
    const collection = await getCollection("questions")
    const questions = await collection.findOne()

    return NextResponse.json(questions, { status: 200 })
  } catch (error) {
    console.error("Error fetching questions:", error)
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 })
  }
}

