export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { options } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"

import prisma from "@/libs/prismadb"

// Process POST request to /api/current
export async function GET(request : Request) {
  try{
    const session = await getServerSession(options);

    if(!session?.user?.email){
      //ignore not signed in error
      //throw new Error('Not signed in with a user account');
      return NextResponse.json( null , { status: 200 });
    }

    const currentUser = await prisma.user.findUnique({
      where: {
          email: session.user.email
      }
    });

    if (!currentUser) {
      return NextResponse.json( null , { status: 200 });
    } 

    return NextResponse.json(currentUser, { status: 200 });
  } catch (error){
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}
