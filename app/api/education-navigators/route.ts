import { type NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

// GET all education navigators
export async function GET() {
  try {
    const collection = await getCollection("educationNavigators")
    const navigators = await collection.find({}).toArray()

    return NextResponse.json(navigators, { status: 200 })
  } catch (error) {
    console.error("Error fetching education navigators:", error)
    return NextResponse.json({ error: "Failed to fetch education navigators" }, { status: 500 })
  }
}

// POST to add/update an education navigator
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const collection = await getCollection("educationNavigators")

    // If _id exists, it's an update operation
    if (body._id) {
      const id = body._id
      const { _id, ...updateData } = body

      const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData })

      if (result.matchedCount === 0) {
        return NextResponse.json({ error: "Education navigator not found" }, { status: 404 })
      }

      return NextResponse.json({ message: "Education navigator updated successfully", _id: id }, { status: 200 })
    }
    // Otherwise, it's a new education navigator
    else {
      const result = await collection.insertOne(body)
      return NextResponse.json(
        { message: "Education navigator added successfully", _id: result.insertedId },
        { status: 201 },
      )
    }
  } catch (error) {
    console.error("Error adding/updating education navigator:", error)
    return NextResponse.json({ error: "Failed to add/update education navigator" }, { status: 500 })
  }
}

