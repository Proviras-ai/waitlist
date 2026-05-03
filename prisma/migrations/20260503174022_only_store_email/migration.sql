/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `agentOrHuman` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `approved` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `buildingStatus` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `models` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_buildingStatus_idx";

-- DropIndex
DROP INDEX "User_createdAt_idx";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "agentOrHuman",
DROP COLUMN "approved",
DROP COLUMN "buildingStatus",
DROP COLUMN "createdAt",
DROP COLUMN "fullName",
DROP COLUMN "id",
DROP COLUMN "models";

-- DropEnum
DROP TYPE "AgentOrHuman";

-- DropEnum
DROP TYPE "BuildingStatus";

-- DropEnum
DROP TYPE "Framework";
