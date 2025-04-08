import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

// GET all FEPs with aggregated activities and clients
export async function GET() {
  try {
    const fepsCollection = await getCollection("feps");
    const actionsCollection = await getCollection("actions");
    const clientsCollection = await getCollection("clients");

    // Fetch all FEPs
    const feps = await fepsCollection.find({}).toArray();

    // Process each FEP to aggregate activities and clients
    const enrichedFeps = await Promise.all(
      feps.map(async (fep) => {
        // Fetch activities where the FEP was involved, sorted by most recent first
        const actions = await actionsCollection
          .find({ who: fep.name }) // Assuming 'who' field in activities matches FEP name
          .sort({ when: -1 }) // Sort activities by 'when' in descending order (most recent first)
          .toArray();

        // Fetch clients associated with the FEP
        const clients = await clientsCollection
          .find({ fep: fep.name }) // Assuming 'fep' field in clients matches FEP name
          .toArray();

        return {
          name: fep.name,
          educationNavigator: fep.navigatorName, // Assuming the field in DB is 'navigatorName'
          actions, // Actions where the FEP was involved
          clients, // Clients associated with the FEP
          mostRecentAction: actions.length > 0 ? actions[0] : null, // Get the most recent action
        };
      }),
    );

    return NextResponse.json(enrichedFeps, { status: 200 });
  } catch (error) {
    console.error("Error fetching FEPs with aggregated data:", error);
    return NextResponse.json(
      { error: "Failed to fetch FEPs with activities and clients" },
      { status: 500 },
    );
  }
}
