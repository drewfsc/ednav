// import {connectToDatabase} from "../../../lib/dbConnect";
// import {NextResponse} from "next/server";

export async function GET(request) {
    // const {db, client} = await connectToDatabase();
    // let data = await request.valueOf()
    // return NextResponse.json({status: 200, data})
}

export async function HEAD(request) {}

export async function POST(request) {
    // const {db, client} = await connectToDatabase();
    // let data = await request.json()
    // let {username, password} = await data;
    //
    // // await client.connect();
    // const userLook = await db.collection("users").findOne({username});
    // if (!userLook) {
    //     return NextResponse.json(401);
    // }
    //
    //
    // return NextResponse.json({status: 200, userLook});
}

export async function PUT(request) {}

export async function DELETE(request) {}

export async function PATCH(request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and set the appropriate Response `Allow` header depending on the other methods defined in the Route Handler.
export async function OPTIONS(request) {}
