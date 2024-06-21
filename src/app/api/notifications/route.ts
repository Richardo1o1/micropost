import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb"
import getCurrentUser from "@/libs/getCurrentuser";

export const dynamic = 'force-dynamic';
// Process GET request to /api/notification
export async function GET(request :NextRequest) {
  try{
    const currentuserId = await getCurrentUser();  

    if (!currentuserId) {
      return NextResponse.json( null , { status: 200 });
    } 

    const notifications = await prisma.notification.findMany({
      where: {
        userId: currentuserId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    await prisma.user.update({
      where: {
        id: currentuserId
      },
      data: {
        hasNotification: false
      }
    });

    return NextResponse.json(notifications, { status: 200 });
  } catch (error){
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}
