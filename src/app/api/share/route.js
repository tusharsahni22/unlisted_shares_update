import { NextResponse} from "next/server";
import {connectToDatabase} from "@/app/lib/mongodb";


export async function  GET(request) {
    await connectToDatabase();
    const data = await 
  return  NextResponse.json({"helloworld": "Hello World!"});
}