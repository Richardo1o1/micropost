import { NextResponse } from "next/server";

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
        userId: currentUserId,
        followingId: userId
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
export async function GET(request : Request, { params }: { params: { userId?: string, postAuthorId?: string} }) {
  try{
    if ( params.userId === null && params.postAuthorId === null ) {
      return NextResponse.json({ error: 'userId or postAuthorId is required' }, { status: 400 });
    }

    let users;
    if (params.userId) {
      users = await prisma.followingId.findMany({
        where: {
          userId: params.userId
        }
      });
    } else if (params.postAuthorId) {
      users = await prisma.followingId.findMany({
        where: {
          followingId: params.postAuthorId
        }
      });
    }

    return NextResponse.json(users, { status: 200 });
  } catch (error){
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}