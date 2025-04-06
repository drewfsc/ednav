import { type NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { ObjectId } from 'mongodb';

// GET activities, optionally filtered by clientId
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get("clientId")

    const collection = await getCollection("actions")

    let query = {}
    if (clientId) {
      query = { clientId }
    }

    const actions = await collection.find(query).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(actions, { status: 200 })
  } catch (error) {
    console.error("Error fetching activities:", error)
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const actionsCollection = await getCollection("actions")
    const clientsCollection = await getCollection("clients")
    const notesCollection = await getCollection("notes")

    // Add timestamp if not provided
    if (!body.createdAt) {
      body.createdAt = new Date().toISOString()
    }
    if(body.path.includes("graduated from")) {
      const client = await clientsCollection.findOne({_id: new ObjectId(body.clientId)})
      if (client) {
        await clientsCollection.updateOne({_id: new ObjectId(body.clientId)}, { $set: { clientStatus: "Graduated" }})
      }
    }
    if(body.path.includes("enrolled in")) {
      const client = await clientsCollection.findOne({_id: new ObjectId(body.clientId)})
      if (client) {
        await clientsCollection.updateOne({_id: new ObjectId(body.clientId)}, { $set: { clientStatus: "In Progress" }})
      }
    }
    if(body.path.includes("inactive")) {
      const client = await clientsCollection.findOne({_id: new ObjectId(body.clientId)})
      if (client) {
        await clientsCollection.updateOne({_id: new ObjectId(body.clientId)}, { $set: { clientStatus: "Inactive" }})
      }
    }
    const query = { _id: new ObjectId(body.clientId) }
    let user
    user = await clientsCollection.updateOne(query, { $set: { lastActivity: new Date().toISOString() } })
    if (body.trackable) {
       user = await clientsCollection.updateOne(
         query,
         {
           $set:
             {
               trackable: body.trackable,
             }
         }
       )
    }
    if (body.trackable?.items?.some((item: { name: string; completed: boolean }) => item.name.toLowerCase() === "orientation" && item.completed)) {
      user = await clientsCollection.updateOne(
        query,
        {
          $set:
            {
              orientation: {dateReferred: new Date().toISOString(), completedDate: null},
            }
        }
      )
    }
    if (body.trackable?.items?.some((item: { name: string; completed: boolean }) => item.name.toLowerCase() === "tabe" && item.completed)) {
      user = await clientsCollection.updateOne(
        query,
        {
          $set:
            {
              tabe: {dateReferred: new Date().toISOString(), completedDate: null},
            }
        }
      )
    }

    const result = await actionsCollection.insertOne(body)
    const userActions = await actionsCollection.find({ clientId: body.clientId }).sort({ createdAt: -1 }).toArray()
    const notes = await notesCollection.find({ clientId: body.clientId }).sort({ createdAt: -1 }).toArray()
    const wholeUser = await clientsCollection.findOne({_id: new ObjectId(body.clientId)})

    return NextResponse.json({ message: "Action added successfully",wholeUser, userActions, notes, _id: result, user }, { status: 201 })
  } catch (error) {
    console.error("Error adding action:", error)
    return NextResponse.json({ error: "Failed to add action" }, { status: 500 })
  }
}
