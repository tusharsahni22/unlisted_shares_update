import { NextResponse} from "next/server";
import {connectToDatabase} from "@/app/lib/dbConnection/mongodb";
import sharePriceSchema from "@/app/lib/Schema/SharePriceSchema";


export async function  GET(request) {
    await connectToDatabase();
    const data = await sharePriceSchema.find({});
    return NextResponse.json(data); 
}

export async function POST(request) {
  await connectToDatabase();
  const data = await request.json();
  console.log(data);
  const { _id, ...updateData } = data;
  const sharePrice = await sharePriceSchema.findOneAndUpdate({ name: data.name }, updateData,{ new: true, upsert: true });
  return NextResponse.json(sharePrice);
} 