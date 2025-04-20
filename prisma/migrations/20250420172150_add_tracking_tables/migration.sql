-- CreateTable
CREATE TABLE "TrackingScript" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "script" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "location" TEXT NOT NULL,
    "loadType" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastVerified" TIMESTAMP(3),
    "triggerConditions" JSONB,
    "userId" TEXT,

    CONSTRAINT "TrackingScript_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackingLog" (
    "id" TEXT NOT NULL,
    "trackingScriptId" TEXT,
    "action" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userEmail" TEXT NOT NULL,
    "details" TEXT,

    CONSTRAINT "TrackingLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrackingScript" ADD CONSTRAINT "TrackingScript_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackingLog" ADD CONSTRAINT "TrackingLog_trackingScriptId_fkey" FOREIGN KEY ("trackingScriptId") REFERENCES "TrackingScript"("id") ON DELETE SET NULL ON UPDATE CASCADE;
