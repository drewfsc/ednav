import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req: Request) {
    const db = await connectToDatabase();
    const actionsCollection = db.db.collection("actions");
    const notesCollection = db.db.collection("notes");
    const clientsCollection = db.db.collection("clients");

    // Extract query parameters for filtering words
    const url = new URL(req.url);
    const filter = url.searchParams.getAll("filter[]") || [];

    // New pipeline for counting clients by region
    const clientsByRegionPipeline = [
        {
            $group: {
                _id: "$region", // Assuming there's a "region" field in the client documents
                count: { $sum: 1 }
            }
        },
        { $sort: { count: -1 } }
    ];

    // Aggregation pipeline for actions
    const pipeline = [
        {
            $project: {
                words: {
                    $filter: {
                        input: {
                            $split: [
                                {
                                    $toLower: {
                                        $replaceAll: {
                                            input: {
                                                $replaceAll: {
                                                    input: {
                                                        $replaceAll: {
                                                            input: {
                                                                $replaceAll: {
                                                                    input: {
                                                                        $concat: [
                                                                            { $ifNull: ["$what", ""] },
                                                                            " ",
                                                                            { $ifNull: ["$where", ""] }
                                                                        ]
                                                                    },
                                                                    find: ".",
                                                                    replacement: ""
                                                                }
                                                            },
                                                            find: ",",
                                                            replacement: ""
                                                        }
                                                    },
                                                    find: "!",
                                                    replacement: ""
                                                }
                                            },
                                            find: "?",
                                            replacement: ""
                                        }
                                    }
                                },
                                " "
                            ]
                        },
                        as: "word",
                        cond: { $gt: [{ $strLenCP: "$$word" }, 2] } // Filter words longer than 2 characters
                    }
                }
            }
        },
        { $unwind: "$words" },
        {
            $group: {
                _id: "$words",
                count: { $sum: 1 },
            },
        }
    ];

    // Aggregation pipeline for notes
    const notesPipeline = [
        {
            $project: {
                words: {
                    $filter: {
                        input: {
                            $split: [
                                {
                                    $toLower: {
                                        $replaceAll: {
                                            input: {
                                                $replaceAll: {
                                                    input: {
                                                        $replaceAll: {
                                                            input: {
                                                                $replaceAll: {
                                                                    input: {
                                                                        $concat: [
                                                                            { $ifNull: ["$noteText", ""] }
                                                                        ]
                                                                    },
                                                                    find: ".",
                                                                    replacement: ""
                                                                }
                                                            },
                                                            find: ",",
                                                            replacement: ""
                                                        }
                                                    },
                                                    find: "!",
                                                    replacement: ""
                                                }
                                            },
                                            find: "?",
                                            replacement: ""
                                        }
                                    }
                                },
                                " "
                            ]
                        },
                        as: "word",
                        cond: { $gt: [{ $strLenCP: "$$word" }, 2] } // Filter words longer than 2 characters
                    }
                }
            }
        },
        { $unwind: "$words" },
        {
            $group: {
                _id: "$words",
                count: { $sum: 1 },
            },
        }
    ];

    // Aggregation pipeline for number of clients referred each month
    const clientsReferredPipeline = [
        {
            $match: { dateReferred: { $exists: true, $ne: null } }
        },
        {
            $project: {
                yearMonth: {
                    $dateToString: {
                        format: "%Y-%m",
                        date: {
                            $cond: {
                                if: { $eq: [{ $type: "$dateReferred" }, "date"] }, // If already a valid date, use it
                                then: "$dateReferred",
                                else: {
                                    $dateFromString: {
                                        dateString: "$dateReferred",
                                        onError: null, // Handle invalid date values gracefully
                                        onNull: null
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        {
            $match: { yearMonth: { $ne: null } } // Remove invalid date entries
        },
        {
            $group: {
                _id: "$yearMonth",
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ];

    // Aggregation pipeline for number of clients who graduated each month
    const graduatedClientsPipeline = [
        {
            $match: { what: { $regex: "^graduated$", $options: "i" }, createdAt: { $exists: true, $ne: null } }
        },
        {
            $project: {
                parsedCreatedAt: {
                    $dateFromString: {
                        dateString: "$createdAt",
                        onError: null, // Prevents errors if conversion fails
                        onNull: null
                    }
                }
            }
        },
        {
            $match: { parsedCreatedAt: { $ne: null } } // Remove invalid dates
        },
        {
            $project: {
                yearMonth: {
                    $dateToString: {
                        format: "%Y-%m",
                        date: "$parsedCreatedAt"
                    }
                }
            }
        },
        {
            $group: {
                _id: "$yearMonth",
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ];

    // Aggregation pipeline for number of clients who were enrolled each month
    const enrolledClientsPipeline = [
        {
            $match: { what: { $regex: "^enrolled$", $options: "i" }, createdAt: { $exists: true, $ne: null } }
        },
        {
            $project: {
                parsedCreatedAt: {
                    $dateFromString: {
                        dateString: "$createdAt",
                        onError: null, // Prevents errors if conversion fails
                        onNull: null
                    }
                }
            }
        },
        {
            $match: { parsedCreatedAt: { $ne: null } } // Remove invalid dates
        },
        {
            $project: {
                yearMonth: {
                    $dateToString: {
                        format: "%Y-%m",
                        date: "$parsedCreatedAt"
                    }
                }
            }
        },
        {
            $group: {
                _id: "$yearMonth",
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
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
    const actionsData = await actionsCollection.aggregate(pipeline).toArray();
    const notesData = await notesCollection.aggregate(notesPipeline).toArray();
    // const clientStatusData = await clientsCollection.aggregate(clientStatusPipeline).toArray();
    const clientStatusData = await clientsCollection.aggregate(clientStatusPipeline).toArray();
    const clientsReferredData = await clientsCollection.aggregate(clientsReferredPipeline).toArray();
    const graduatedClientsData = await actionsCollection.aggregate(graduatedClientsPipeline).toArray();
    const enrolledClientsData = await actionsCollection.aggregate(enrolledClientsPipeline).toArray();
    const clientsByRegionData = await clientsCollection.aggregate(clientsByRegionPipeline).toArray();

    // Combine results for word cloud
    const wordFrequency: Record<string, number> = {};
    [...actionsData, ...notesData].forEach(({ _id, count }) => {
        wordFrequency[_id] = (wordFrequency[_id] || 0) + count;
    });

    // Apply filter (remove words in the filter array)
    const filteredWordCloudData = Object.entries(wordFrequency)
        .filter(([word]) => !filter.includes(word))
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

    // Format client metrics
    const clientsReferredPerMonth = clientsReferredData.map(({ _id, count }) => ({
        month: _id,
        count,
    }));

    const graduatedClientsPerMonth = graduatedClientsData.map(({ _id, count }) => ({
        month: _id,
        count,
    }));

    const enrolledClientsPerMonth = enrolledClientsData.map(({ _id, count }) => ({
        month: _id,
        count,
    }));

    // total clients
    const totalClientCount = await clientsCollection.countDocuments({
        clientStatus: { $ne: "Inactive" } // Exclude "inactive" clients
    }) || 0;

    // Final response
    return NextResponse.json({
        totalClients: totalClientCount,
        clientsByRegionData,
        clientStatusBreakdown: clientStatusPercentages,
        clientsReferredPerMonth,
        graduatedClientsPerMonth,
        enrolledClientsPerMonth,
        wordCloud: filteredWordCloudData,
    });
}
