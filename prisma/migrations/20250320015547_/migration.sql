/*
  Warnings:

  - The values [REGULAR,RESERVED,VISIT] on the enum `CarType` will be removed. If these variants are still used in the database, this will fail.
  - The values [IN,OUT] on the enum `ParkingState` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CarType_new" AS ENUM ('방문차량', '정기차량', '예약차량');
ALTER TABLE "History" ALTER COLUMN "carType" TYPE "CarType_new" USING ("carType"::text::"CarType_new");
ALTER TYPE "CarType" RENAME TO "CarType_old";
ALTER TYPE "CarType_new" RENAME TO "CarType";
DROP TYPE "CarType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ParkingState_new" AS ENUM ('입차', '출차');
ALTER TABLE "History" ALTER COLUMN "parkingState" TYPE "ParkingState_new" USING ("parkingState"::text::"ParkingState_new");
ALTER TYPE "ParkingState" RENAME TO "ParkingState_old";
ALTER TYPE "ParkingState_new" RENAME TO "ParkingState";
DROP TYPE "ParkingState_old";
COMMIT;
