import { NextRequest, NextResponse } from "next/server";

import prisma from '@/libs/prismadb';
import getUniqueID from '@/libs/uniqueID';
import getCurrentUser from "@/libs/getCurrentuser";

// Process POST request to /api/register
export async function POST(request : NextRequest) {
  try{
    const requestBody = await request.json();
    const { body } = requestBody;

    const currentuserId = await getCurrentUser();
    const postId = request.nextUrl.searchParams.get('postId');

    if(!body || !postId || !currentuserId) {
      throw new Error('Invalid body/postId');
    }

    const commentId = getUniqueID('25');
    
    const comment = await prisma.comment.create({
      data: {
        id : commentId,
        body,
        userId : currentuserId,
        postId: postId
      }
    })

    return NextResponse.json(comment, { status: 200 });
  } catch (error){
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}
