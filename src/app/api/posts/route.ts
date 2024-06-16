import { NextRequest, NextResponse } from "next/server";
import { useSearchParams } from "next/navigation";

import prisma from '@/libs/prismadb';
import getUniqueID from "@/libs/uniqueID";
import getCurrentUser from "@/libs/getCurrentuser";

// Process GET request to /api/posts
export async function GET(request : NextRequest) {
  try{
    
    const userId = request.nextUrl.searchParams.get('userId');

    let posts;

    if ( userId && typeof userId === 'string' ){
      posts = await prisma.post.findMany({
        where: {
          userId 
        },
        include: {
          user: true,
          comments: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    } else {
      posts = await prisma.post.findMany({
        include: {
          user: true,
          comments: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    }

    return NextResponse.json(posts, { status: 200 });
  } catch (error){
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}

// Process POST request to /api/posts
export async function POST(request : Request) {
  try{
    const requestBody = await request.json();
    const currentuserId = await getCurrentUser();   
    const poseId = getUniqueID('20');

    console.log("Post log:", requestBody, currentuserId, poseId);
    
    const post = await prisma.post.create({
      data: {
        id : poseId,
        body: requestBody.body as string,
        userId : currentuserId as string
      }
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error){
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}