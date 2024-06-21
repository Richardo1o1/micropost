import { NextRequest, NextResponse } from "next/server";

import prisma from '@/libs/prismadb';
import getUniqueID from '@/libs/uniqueID';
import getCurrentUser from '@/libs/getCurrentuser';

// Process POST request to /api/like
export async function POST(request : Request) {
  try{
    const requestBody = await request.json();

    const { postId } = requestBody;
    const currentUserId = await getCurrentUser();
    const followId = getUniqueID('28');
    
    if (!requestBody || !currentUserId ) {
      throw new Error('Missing fields requestBody/currentuserId!');
    }

    if(!postId) {
      throw new Error('Invalid postId');
    }

    if(!currentUserId) {
      throw new Error('Invalid currentUserId');
    }

    const like = await prisma.likedIds.create({
      data: {
        id : followId,
        postId : postId as string,
        likedId : currentUserId as string
      }
    });

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
          body: 'Someone liked your post!',
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

    return NextResponse.json(like, { status: 200 });
  } catch (error){
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}

// Process DELETE request to /api/like
export async function DELETE(request : Request) {
  try{
    const requestBody = await request.json();

    const { postId } = requestBody;
    const currentUserId = await getCurrentUser();
    
    if(!postId) {
      throw new Error('Invalid ID');
    }

    if(!currentUserId) {
      throw new Error('Invalid currentUserId');
    }

    await prisma.likedIds.deleteMany({
      where: {
        postId: postId as string,
        likedId: currentUserId,
      }
    });

    
    return NextResponse.json( { status: 200 });
  } catch (error){
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}

// Process GET request to /api/like
// Giving postId , Return the user list who liked this postId
export async function GET(request : NextRequest) {
  try{
    const postId = request.nextUrl.searchParams.get('postId');

    if ( postId === null ) {
      return NextResponse.json({ error: 'postId  is required' }, { status: 400 });
    }

    const users = await prisma.likedIds.findMany({
        where: {
          postId: postId
        }
      });
    
    return NextResponse.json(users, { status: 200 });
  } catch (error){
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}