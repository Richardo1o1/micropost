import { NextResponse } from "next/server";

import prisma from '@/libs/prismadb';

export async function PATCH(request : Request) {
  try{
    const requestBody = await request.json();

    const { name, username, bio, profileImage, coverImage,userId } = requestBody;

    if(!name || !username ){
      throw new Error('Missing fields!');
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage
      }
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error){
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}