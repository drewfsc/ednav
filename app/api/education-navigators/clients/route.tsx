import { type NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(req: Request) {
    const url = new URL(req.url);
    const navigatorName = url.searchParams.get("navigator") || undefined; // Use query param if present
    try {
        const collection = await getCollection("clients")
        const clients = await collection.aggregate([
            {
                $lookup: {
                    from: "feps",
                    localField: "fep",   // 'fep' in clients
                    foreignField: "name", // 'name' in feps
                    as: "fepsData"
                }
            },
            { $unwind: "$fepsData" }, // Ensure we only match existing feps
            { $match: { "fepsData.navigatorName": navigatorName } },

        ]).toArray();

        return NextResponse.json(clients, { status: 200 })
    } catch (error) {
        console.error("Error fetching clients:", error)
        return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 })
    }
}

// export const GET = async (req: Request) => {
//     try {
//         const session = await auth(); // Retrieve session
//         if (!session?.user?.name) {
//             return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//         }
//
//         const { db } = await connectToDatabase();
//             // const navigatorName = session.user.name; // Get the logged-in user's name
//         // const navigatorName = session.user.name; // Get the logged-in user's name
//         const url = new URL(req.url);
//         const navigatorName = url.searchParams.get("navigator") || undefined; // Use query param if present
//
//         console.log(`Fetching clients for navigator ID: ${navigatorName}`);
//
//         let clients = await db.collection("clients").aggregate([
//             {
//                 $lookup: {
//                     from: "feps",
//                     localField: "fep",   // 'fep' in clients
//                     foreignField: "name", // 'name' in feps
//                     as: "fepsData"
//                 }
//             },
//             { $unwind: "$fepsData" }, // Ensure we only match existing feps
//             { $match: { "fepsData.navigatorName": navigatorName } },
//
//         ]).toArray();
//
//         return NextResponse.json({ clients }, { status: 200 });
//
//     } catch (error) {
//         console.error("Error fetching clients:", error);
//         return new Response(JSON.stringify({ error: "Failed to fetch clients" }), {
//             status: 500,
//             headers: { "Content-Type": "application/json" },
//         });
//     }
// };
