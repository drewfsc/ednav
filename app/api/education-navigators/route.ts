import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function GET() {
  try {
    const navigatorsCollection = await getCollection("educationNavigators");
    const fepsCollection = await getCollection("feps");
    const clientsCollection = await getCollection("clients");

    // Fetch all navigators
    const navigators = await navigatorsCollection.find({}).toArray();

    // Process each navigator
    const enrichedNavigators = await Promise.all(
        navigators.map(async (navigator) => {
          const navigatorName = navigator.name;

          // Fetch all feps linked to the navigator
          const feps = await fepsCollection.find({ navigatorName }).toArray();

          // Extract fep names to find clients
          const fepNames = feps.map((fep) => fep.name);

          // Fetch all clients linked to these feps
          const clients = await clientsCollection.find({ fep: { $in: fepNames } }).toArray();

          return {
            ...navigator,
            feps,
            clients,
          };
        })
    );

    return NextResponse.json(enrichedNavigators, { status: 200 });
  } catch (error) {
    console.error("Error fetching education navigators with associated data:", error);
    return NextResponse.json({ error: "Failed to fetch education navigators" }, { status: 500 });
  }
}
