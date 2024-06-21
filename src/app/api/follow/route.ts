import { NextRequest, NextResponse } from "next/server";

import prisma from '@/libs/prismadb';
import getUniqueID from '@/libs/uniqueID';
import getCurrentUser from '@/libs/getCurrentuser';

// Process POST request to /api/follow
export async function POST(request : Request) {
  try{
    const requestBody = await request.json();

    const { userId } = requestBody;
    const currentUserId = await getCurrentUser();
    const followId = getUniqueID('15');
    
    if(!userId) {
      throw new Error('Invalid ID');
    }

    if(!currentUserId) {
      throw new Error('Invalid currentUserId');
    }

    const follow = await prisma.followingId.create({
      data: {
        id : followId,
        userId : userId as string,
        followingId : currentUserId as string
      }
    });

    return NextResponse.json(follow, { status: 200 });
  } catch (error){
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}

// Process DELETE request to /api/follow
export async function DELETE(request : Request) {
  try{
    const requestBody = await request.json();

    const { userId } = requestBody;
    const currentUserId = await getCurrentUser();
    
    if(!userId) {
      throw new Error('Invalid ID');
    }

    if(!currentUserId) {
      throw new Error('Invalid currentUserId');
    }

    await prisma.followingId.deleteMany({
      where: {
        userId: userId,
        followingId: currentUserId
      }
    });

    // Add notification message
    const notificationId = getUniqueID('30');
    await prisma.notification.create({
      data: {
        id: notificationId,
        body: 'Someone followed you!',
        userId
      }
    });

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        hasNotification: true
      }
    });

    return NextResponse.json( { status: 200 });
  } catch (error){
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}

// Process GET request to /api/follow
// Giving userId, Return the user list who userId is following
// Giving postAuthorId , Return the user list who is following postAuthorId
export async function GET(request : NextRequest) {
  try{

    const userId = request.nextUrl.searchParams.get('userId');
    const postAuthorId = request.nextUrl.searchParams.get('postAuthorId');

    if ( userId === null && postAuthorId === null ) {
      return NextResponse.json({ error: 'userId or postAuthorId is required' }, { status: 400 });
    }

    //console.log("follow api: userId", userId, "postAuthorId", postAuthorId);

    let users;
    if ( userId) {
      users = await prisma.followingId.findMany({
        where: {
          userId: userId
        }
      });
    } else if (postAuthorId) {
      users = await prisma.followingId.findMany({
        where: {
          followingId: postAuthorId
        }
      });
    }

    //console.log("follow api: users", users);
    return NextResponse.json(users, { status: 200 });
  } catch (error){
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}