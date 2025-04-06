import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
// import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const navigator = url.searchParams.get("navigator") || "";
  console.log(navigator)
  const navigatorsCollection = await getCollection("users");
  const navigators = await navigatorsCollection.findOne({name: navigator});
  return NextResponse.json(navigators, { status:200} )
  // try {
  //   if (!navigator) {
  //     const navigators = await navigatorsCollection.find({}).toArray();
  //     return NextResponse.json(navigators, { status: 200 });
  //   }else {
  //     console.log(navigator)
  //     const navigators = await navigatorsCollection.findOne({name: navigator || undefined});
  //     return NextResponse.json(navigators, { status: 200 });
  //   }
  // }catch (error) {
  //   return NextResponse.json(error, {status: 500})
  // }
}
