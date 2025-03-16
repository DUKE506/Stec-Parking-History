/*
  Warnings:

  - Changed the type of `totalTime` on the `GateLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `visitPointTime` on the `GateLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "GateLog" DROP COLUMN "totalTime",
ADD COLUMN     "totalTime" INTEGER NOT NULL,
DROP COLUMN "visitPointTime",
ADD COLUMN     "visitPointTime" INTEGER NOT NULL;
