/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."user";

-- CreateTable
CREATE TABLE "public"."userQuery" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "queryDestination" TEXT NOT NULL,
    "numberOfDays" INTEGER NOT NULL,
    "message" TEXT,
    "budget" TEXT,
    "travelMonth" TEXT,
    "year" TEXT,

    CONSTRAINT "userQuery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userQuery_id_key" ON "public"."userQuery"("id");
