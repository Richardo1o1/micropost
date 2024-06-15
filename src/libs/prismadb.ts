import { PrismaClient  } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()

// Make sure Prisma is in the global object
globalThis.prisma = client;

export default client;