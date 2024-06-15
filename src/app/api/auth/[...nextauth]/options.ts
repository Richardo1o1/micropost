import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from "@/libs/prismadb";


export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label:"Email:",
          type: "text",
          placeholder: "your cool email"
        },
        password: {
          label:"Password:",
          type: "password",
          placeholder: "your password"
        }
      },
      async authorize(credentials) {
        //console.log("credentials", credentials);

        if (!credentials?.email || !credentials.password ) {
          return null;
        } 
      
        const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
        });

        if(!user || !user?.hashedPassword ){
            throw new Error('Invalid Credentials2');
        }

        const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
        );

        if(!isCorrectPassword) {
            throw new Error('Invalid Credentials3s');
        }

        return user;
      },

    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session:{
    strategy: 'jwt'
  },
  jwt:{
    secret: process.env.NEXTAUTH_JWT_SECRET
  },
  secret: process.env.NEXTAUTH_SECRET
}