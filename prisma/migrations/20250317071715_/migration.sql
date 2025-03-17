/*
  Warnings:

  - The `exitTime` column on the `History` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `time` on the `GateLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `entryTime` on the `History` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "GateLog" DROP COLUMN "time",
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "History" DROP COLUMN "entryTime",
ADD COLUMN     "entryTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "exitTime",
ADD COLUMN     "exitTime" TIMESTAMP(3);
