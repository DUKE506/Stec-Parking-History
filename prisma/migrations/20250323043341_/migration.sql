/*
  Warnings:

  - Changed the type of `codeName` on the `Patrol` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PatrolState" AS ENUM ('블랙리스트', '입주민', '방문객', '순찰');

-- AlterTable
ALTER TABLE "Patrol" DROP COLUMN "codeName",
ADD COLUMN     "codeName" "PatrolState" NOT NULL;
