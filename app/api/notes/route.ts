import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { InsertOneResult, ObjectId } from "mongodb";

// GET all notes
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const clientId = url.searchParams.get("clientId")?.split(",") || [];
  const activityId = url.searchParams.get("activityId")?.split(",") || [];

  let notes: any[] = [];
  try {
    const collection = await getCollection("notes");
    if (clientId && !activityId) {
      notes = await collection
        .find({ clientId: { $in: clientId.map((id) => new ObjectId(id)) } })
        .toArray();
    } else if (activityId) {
      notes = await collection.find({ activityId: activityId }).toArray();
    } else {
      notes = await collection.find().toArray();
    }

    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 },
    );
  }
}

// POST to add a new note
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { note } = await body;

  if (body?.activityId) {
    const { noteContent, noteAuthor, activityId, mood, clientId } = await note;
    const collection = await getCollection("notes");
    let result: InsertOneResult;
    [[result]] = await Promise.all([
      Promise.all([
        collection.insertOne({
          noteContent,
          noteAuthor,
          activityId,
          mood,
          createdAt: new Date().toISOString(),
          clientId: new ObjectId(clientId),
        }),
      ]),
    ]);
    return NextResponse.json(
      { message: "Note added successfully", _id: result.insertedId },
      { status: 201 },
    );
  } else {
    try {
      const collection = await getCollection("notes");
      const result = await collection.insertOne(note);
      return NextResponse.json(
        { message: "Note added successfully", _id: result.insertedId },
        { status: 201 },
      );
    } catch (error) {
      console.error("Error adding note:", error);
      return NextResponse.json(
        { error: "Failed to add note" },
        { status: 500 },
      );
    }
  }
}
