/*
  Warnings:

  - You are about to drop the column `LineNumber` on the `GateLog` table. All the data in the column will be lost.
  - Added the required column `lineNumber` to the `GateLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GateLog" DROP COLUMN "LineNumber",
ADD COLUMN     "lineNumber" INTEGER NOT NULL;
