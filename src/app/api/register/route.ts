import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

import prisma from '@/libs/prismadb';
import getUniqueID from '@/libs/uniqueID';

// Process POST request to /api/register
export async function POST(request : Request) {
  try{
    const requestBody = await request.json();

    const { email,username, name, password } = requestBody;

    const hashedPassword = await bcrypt.hash(password, 12);
    const userId = getUniqueID('10');
    const user = await prisma.user.create({
        data: {
            id: userId,
            email,
            username,
            name,
            hashedPassword
        }
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error){
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}
