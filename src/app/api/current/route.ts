import { NextResponse } from "next/server";

import serverAuth from "@/libs/serverAuth";
// Process POST request to /api/current
export async function GET(request : Request) {
  try{
    const { currentUser } = await serverAuth();

    if (!currentUser) {
      return NextResponse.json( null , { status: 200 });
    } 

    return NextResponse.json(currentUser, { status: 200 });
  } catch (error){
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}
