import { type NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

// GET all FEPs
export async function GET() {
  try {
    const collection = await getCollection("feps")
    const feps = await collection.find({}).toArray()

    return NextResponse.json(feps, { status: 200 })
  } catch (error) {
    console.error("Error fetching FEPs:", error)
    return NextResponse.json({ error: "Failed to fetch FEPs" }, { status: 500 })
  }
}

// POST to add/edit a FEP
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const collection = await getCollection("feps")

    // If _id exists, it's an update operation
    if (body._id) {
      const id = body._id
      const { _id, ...updateData } = body

      const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData })

      if (result.matchedCount === 0) {
        return NextResponse.json({ error: "FEP not found" }, { status: 404 })
      }

      return NextResponse.json({ message: "FEP updated successfully", _id: id }, { status: 200 })
    }
    // Otherwise, it's a new FEP
    else {
      const result = await collection.insertOne(body)
      return NextResponse.json({ message: "FEP added successfully", _id: result.insertedId }, { status: 201 })
    }
  } catch (error) {
    console.error("Error adding/updating FEP:", error)
    return NextResponse.json({ error: "Failed to add/update FEP" }, { status: 500 })
  }
}

