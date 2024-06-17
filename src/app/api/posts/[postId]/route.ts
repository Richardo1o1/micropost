import {  NextResponse } from "next/server";

import prisma from '@/libs/prismadb';

// Process GET request to /api/users
export async function GET(request : Request, { params }: { params: { postId: string } }) {
  try{
    if ( params.postId === null ) {
      return NextResponse.json({ error: 'postId is required' }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: params.postId
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error){
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}
