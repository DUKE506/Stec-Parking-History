-- CreateEnum
CREATE TYPE "CarType" AS ENUM ('REGULAR', 'RESERVED');

-- CreateEnum
CREATE TYPE "ParkingState" AS ENUM ('IN', 'OUT');

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "carType" "CarType" NOT NULL,
    "parkingState" "ParkingState" NOT NULL,
    "carNumber" TEXT NOT NULL,
    "entryTime" TEXT NOT NULL,
    "exitTime" TEXT NOT NULL,
    "totalTime" TEXT NOT NULL,
    "parkingAreaName" TEXT NOT NULL,
    "entryArea" TEXT NOT NULL,
    "exitArea" TEXT NOT NULL,
    "dong" TEXT NOT NULL,
    "ho" TEXT NOT NULL,
    "isBlack" BOOLEAN NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GateLog" (
    "id" SERIAL NOT NULL,
    "seq" TEXT NOT NULL,
    "parkingAreaId" TEXT NOT NULL,
    "carNumber" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "stateName" TEXT NOT NULL,
    "gateId" TEXT NOT NULL,
    "gateName" TEXT NOT NULL,
    "LineNumber" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "lprState" TEXT NOT NULL,
    "lprStateName" TEXT NOT NULL,
    "carTypeName" TEXT NOT NULL,
    "blackListInfo" TEXT NOT NULL,
    "isBlack" BOOLEAN NOT NULL,
    "blackDescription" TEXT NOT NULL,
    "addTime" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "dong" TEXT NOT NULL,
    "ho" TEXT NOT NULL,
    "isResevation" BOOLEAN NOT NULL,
    "isWait" BOOLEAN NOT NULL,
    "waitDescription" TEXT NOT NULL,
    "totalTime" TEXT NOT NULL,
    "visitPointTime" TEXT NOT NULL,
    "etc" TEXT NOT NULL,
    "historyId" INTEGER NOT NULL,

    CONSTRAINT "GateLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GateLog" ADD CONSTRAINT "GateLog_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
