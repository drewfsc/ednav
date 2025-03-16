import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb"; // Ensure you have this MongoDB connection utility
// import { getCollection } from "@/lib/mongodb"


export async function GET(req: Request) {
    const db = await connectToDatabase();
    const actionsCollection = db.db.collection("actions");
    const notesCollection = db.db.collection("notes");
    const clientsCollection = db.db.collection("clients");

    // Extract query parameters for filtering words
    const url = new URL(req.url);
    const filter = url.searchParams.getAll("filter[]") || [];

    // Function to tokenize text into words
    const tokenizeText = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s]/g, "") // Remove punctuation
            .split(/\s+/) // Split by whitespace
            .filter((word) => word.length > 2); // Remove short words
    };

    // Aggregation pipeline for `actions`
    const actionsPipeline = [
        { $project: { text: { $concat: ["$description", " ", "$action"] } } },
        { $unwind: { path: "$text", preserveNullAndEmptyArrays: true } },
        {
            $group: {
                _id: "$text",
                count: { $sum: 1 },
            },
        },
    ];

    // Aggregation pipeline for `notes`
    const notesPipeline = [
        { $project: { text: { $concat: ["$note", " ", "$details"] } } },
        { $unwind: { path: "$text", preserveNullAndEmptyArrays: true } },
        {
            $group: {
                _id: "$text",
                count: { $sum: 1 },
            },
        },
    ];

    // Aggregation pipeline for clientStatuses
    const clientStatusPipeline = [
        {
            $group: {
                _id: "$clientStatus",
                count: { $sum: 1 },
            },
        },
        {
            $sort: { count: -1 },
        },
    ];

    // Execute aggregations
    const actionsData = await actionsCollection.aggregate(actionsPipeline).toArray();
    const notesData = await notesCollection.aggregate(notesPipeline).toArray();
    const clientStatusData = await clientsCollection.aggregate(clientStatusPipeline).toArray();

    // Combine results for word cloud
    const wordFrequency: Record<string, number> = {};

    [...actionsData, ...notesData].forEach(({ _id, count }) => {
        if (_id) {
            const words = tokenizeText(_id);
            words.forEach((word) => {
                wordFrequency[word] = (wordFrequency[word] || 0) + count;
            });
        }
    });

    // Apply filter (remove words in the filter array)
    const filteredWordCloudData = Object.entries(wordFrequency)
        .filter(([word]) => !filter.includes(word)) // Remove filtered words
        .map(([word, count]) => ({
            text: word,
            value: count,
        }))
        .sort((a, b) => b.value - a.value);

    // Compute clientStatus percentages
    const totalClients = clientStatusData.reduce((sum, { count }) => sum + count, 0);
    const clientStatusPercentages = clientStatusData.map(({ _id, count }) => ({
        status: _id,
        percentage: totalClients > 0 ? ((count / totalClients) * 100).toFixed(2) + "%" : "0%",
    }));

    // Final response
    return NextResponse.json({
        wordCloud: filteredWordCloudData,
        clientStatusBreakdown: clientStatusPercentages,
    });
}
