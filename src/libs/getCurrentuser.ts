import { options } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"

import prisma from "@/libs/prismadb"

// Process POST request to /api/current
export async function getCurrentUser() {
  try{
    const session = await getServerSession(options);

    if(!session?.user?.email){
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
          email: session.user.email
      }
    });

    if (!currentUser) {
      return null;
    } 
    return currentUser?.id;
  }
  catch (error){
    console.log(error);
    return null;
  }
}

export default getCurrentUser;