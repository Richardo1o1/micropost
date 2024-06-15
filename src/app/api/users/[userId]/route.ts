import {  NextResponse } from "next/server";

import prisma from '@/libs/prismadb';

// Process GET request to /api/users
export async function GET(request : Request, { params }: { params: { userId: string } }) {
  try{
    const  userId  = params.userId;

    if ( userId === null ) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const users = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error){
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}
