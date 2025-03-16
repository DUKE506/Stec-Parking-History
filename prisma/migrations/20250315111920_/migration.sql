/*
  Warnings:

  - Changed the type of `LineNumber` on the `GateLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "GateLog" DROP COLUMN "LineNumber",
ADD COLUMN     "LineNumber" INTEGER NOT NULL;
