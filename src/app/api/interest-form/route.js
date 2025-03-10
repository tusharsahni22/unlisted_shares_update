import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/dbConnection/mongodb";
import InterestForm from "@/app/lib/Schema/interest-form";

export async function  POST(request) {
 
  await connectToDatabase();
  const data =await request.json();  
  const interestForm = new InterestForm(data);
  console.log("first",interestForm)
  await interestForm.save();
  return NextResponse.json("Interest Form Submitted Successfully", { status: 201 });
//how to return ststaus code

}