-- CreateTable
CREATE TABLE "Patrol" (
    "id" SERIAL NOT NULL,
    "parkId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "codeName" TEXT NOT NULL,
    "img" TEXT,
    "carNumber" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "Patrol_pkey" PRIMARY KEY ("id")
);
