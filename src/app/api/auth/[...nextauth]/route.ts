import NextAuth from "next-auth/next";
import { options } from './options';

const authHandler = NextAuth(options);

export { authHandler as GET, authHandler as POST}