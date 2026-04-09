-- CreateEnum
CREATE TYPE "AgentOrHuman" AS ENUM ('AGENT', 'HUMAN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "agentOrHuman" "AgentOrHuman" NOT NULL DEFAULT 'HUMAN';
