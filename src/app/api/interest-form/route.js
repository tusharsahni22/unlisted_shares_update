import { NextResponse } from "next/server";

export function  GETS(request) {
  return  NextResponse.json({"helloworld": "Hello World!"});
}