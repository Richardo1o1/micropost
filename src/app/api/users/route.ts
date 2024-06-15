import { NextResponse } from "next/server";

import prisma from '@/libs/prismadb';

// Process GET request to /api/users
export async function GET(request : Request) {
  try{
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error){
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}
