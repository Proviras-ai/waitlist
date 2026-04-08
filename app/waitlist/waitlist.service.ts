import { PrismaClient, BuildingStatus, Framework } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });


export type WaitlistInput = {
  name: string;
  email: string;
  building: BuildingStatus;
  frameworks: Framework[];
};

export async function checkDuplicate(email: string) {
  return prisma.user.findFirst({
    where: { email },
  });
}

export async function createWaitlistEntry(input: WaitlistInput) {
  return prisma.user.create({
    data: {
      fullName: input.name,
      email: input.email,
      buildingStatus: input.building,
      models: input.frameworks ?? [],
    },
  });
}