import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


export type WaitlistInput = {
  email: string;
};

export async function checkDuplicate(email: string) {
  return prisma.user.findFirst({
    where: { email },
  });
}

export async function createWaitlistEntry(input: WaitlistInput) {
  return prisma.user.create({
    data: {
      email: input.email,
    },
  });
}
