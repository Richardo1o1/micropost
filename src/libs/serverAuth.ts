import { options } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"

import prisma from "../libs/prismadb"

const serverAuth = async () => {
    const session = await getServerSession(options);

    if(!session?.user?.email){
        //ignore not signed in error
        //throw new Error('Not signed in with a user account');
        return {}
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });

    if(!currentUser){
        //ignore not signed in error
        //throw new Error('Not signed in');
        return {}
    }

    return { currentUser};
}

export default serverAuth;