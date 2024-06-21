import { NextRequest, NextResponse } from "next/server";

import prisma from '@/libs/prismadb';
import getUniqueID from '@/libs/uniqueID';
import getCurrentUser from "@/libs/getCurrentuser";

// Process POST request to /api/comments
export async function POST(request : NextRequest) {
  try{
    const requestBody = await request.json();
    const { body } = requestBody;

    const currentuserId = await getCurrentUser();

    const postId = request.nextUrl.searchParams.get('postId');

    if(!body || !postId || !currentuserId) {
      throw new Error('Invalid body/postId/currentuserId');
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

    // Add notification message
    const post = await prisma.post.findUnique({
      where: {
        id: postId
      },
      include: {
        user: true
      }
    });

    if(post?.userId) {
      const notificationId = getUniqueID('30');
      await prisma.notification.create({
        data: {
          id: notificationId,
          body: 'Someone replied to your post!',
          userId: post.userId 
        }  
      });

      await prisma.user.update({
        where: {
          id: post.userId
        },
        data: {
          hasNotification: true
        }
      })  
    }

    return NextResponse.json(comment, { status: 200 });
  } catch (error){
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}
