/*
  Warnings:

  - The `totalTime` column on the `History` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "History" DROP COLUMN "totalTime",
ADD COLUMN     "totalTime" INTEGER;
