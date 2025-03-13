import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Correct extraction of params
    const collection = await getCollection("clients");

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid client ID format" }, { status: 400 });
    }

    const client = await collection.findOne({ _id: new ObjectId(id) });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json(client, { status: 200 });
  } catch (error) {
    console.error("Error fetching client:", error);
    return NextResponse.json({ error: "Failed to fetch client" }, { status: 500 });
  }
}
