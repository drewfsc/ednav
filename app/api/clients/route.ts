import { type NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

// GET all clients
export async function GET() {
  try {
    const collection = await getCollection("clients")
    const clients = await collection.find({}).toArray()

    return NextResponse.json(clients, { status: 200 })
  } catch (error) {
    console.error("Error fetching clients:", error)
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 })
  }
}

// POST to add a new client
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const collection = await getCollection("clients")

    // If _id exists, it's an update operation
    if (body._id) {
      const id = body._id
      const { _id, ...updateData } = body

      const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateData })

      if (result.matchedCount === 0) {
        return NextResponse.json({ error: "Client not found" }, { status: 404 })
      }

      return NextResponse.json({ message: "Client updated successfully", _id: id }, { status: 200 })
    }
    // Otherwise, it's a new client
    else {
      const result = await collection.insertOne(body)
      return NextResponse.json({ message: "Client added successfully", _id: result.insertedId }, { status: 201 })
    }
  } catch (error) {
    console.error("Error adding/updating client:", error)
    return NextResponse.json({ error: "Failed to add/update client" }, { status: 500 })
  }
}

