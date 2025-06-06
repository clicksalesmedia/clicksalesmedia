/*
  Warnings:

  - You are about to drop the `TrackingLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrackingScript` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TrackingLog" DROP CONSTRAINT "TrackingLog_trackingScriptId_fkey";

-- DropForeignKey
ALTER TABLE "TrackingScript" DROP CONSTRAINT "TrackingScript_userId_fkey";

-- DropTable
DROP TABLE "TrackingLog";

-- DropTable
DROP TABLE "TrackingScript";

-- CreateTable
CREATE TABLE "Logo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "altText" TEXT,
    "link" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Logo_pkey" PRIMARY KEY ("id")
);
