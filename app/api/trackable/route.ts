import { type NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { ObjectId } from 'mongodb';

// POST to add a new action
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get("clientId")

    const body = await request.json()
    const clientsCollection = await getCollection("clients")

    const user = await clientsCollection.findOne({_id: clientId ? new ObjectId(clientId) : undefined})
    let dataRes
    if (user) {
        user.trackable = body.trackable
        dataRes = await clientsCollection.updateOne({_id: clientId ? new ObjectId(clientId) : undefined}, { $set: { trackable: body.trackable }})
    }

    return NextResponse.json({ message: "Action added successfully", dataRes, user }, { status: 201 })
  } catch (error) {
    console.error("Error adding action:", error)
    return NextResponse.json({ error: "Failed to add action" }, { status: 500 })
  }
}
