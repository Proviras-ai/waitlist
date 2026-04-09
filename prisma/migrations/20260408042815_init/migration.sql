-- CreateEnum
CREATE TYPE "BuildingStatus" AS ENUM ('IN_PRODUCTION', 'IN_DEVELOPMENT', 'EVALUATING', 'EXPLORING');

-- CreateEnum
CREATE TYPE "Framework" AS ENUM ('LANGCHAIN', 'CREWAI', 'AUTOGEN', 'LLAMAINDEX', 'AGNO', 'HAYSTACK', 'CUSTOM_OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "buildingStatus" "BuildingStatus",
    "models" "Framework"[],
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- CreateIndex
CREATE INDEX "User_buildingStatus_idx" ON "User"("buildingStatus");
