import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET all comments
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const clientId = url.searchParams.get("clientId")?.split(",") || [];
  // const activityId = url.searchParams.get('activityId')?.split(',') || [];
  // const noteId = url.searchParams.get('noteId')?.split(',') || [];
  let comments: any[] = [];
  try {
    const collection = await getCollection("comments");
    if (clientId) {
      comments = await collection
        .find({ clientId: { $in: clientId.map((id) => new ObjectId(id)) } })
        .toArray();
    } else {
      comments = await collection.find().toArray();
    }

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  body.createdAt = new Date().toISOString();
  const collection = await getCollection("comments");
  // const result = await collection.insertOne(body);
  const comment = await collection
    .find({ activityId: body.activityId })
    .toArray();
  return NextResponse.json(
    { message: "Comment added successfully", comment },
    { status: 201 },
  );
}