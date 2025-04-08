// noinspection ExceptionCaughtLocallyJS
import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const collection = await getCollection("clients");
    const user = await collection.updateOne(
      { _id: new ObjectId(body._id) },
      { $set: { "orientation.completionDate": body.completionDate } },
    );
    if (!user) new Error("User not found");

    return NextResponse.json(
      { message: "Note added successfully", user },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding note:", error);
    return NextResponse.json({ error: "Failed to add note" }, { status: 500 });
  }
}
