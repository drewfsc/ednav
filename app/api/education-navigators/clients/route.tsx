import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const navigatorName = url.searchParams.get("navigator") || undefined; // Use query param if present
  try {
    const collection = await getCollection("clients");
    const clients = await collection
      .aggregate([
        {
          $lookup: {
            from: "feps",
            localField: "fep", // 'fep' in clients
            foreignField: "name", // 'name' in feps
            as: "fepsData",
          },
        },
        { $unwind: "$fepsData" }, // Ensure we only match existing feps
        { $match: { "fepsData.navigatorName": navigatorName } },
      ])
      .toArray();

    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 },
    );
  }
}
