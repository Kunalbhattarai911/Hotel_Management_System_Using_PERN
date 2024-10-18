/*
  Warnings:

  - A unique constraint covering the columns `[roomNumber]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `bedType` on the `Room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BedType" AS ENUM ('Single', 'Double', 'Queen', 'King', 'Twin');

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "bedType",
ADD COLUMN     "bedType" "BedType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Room_roomNumber_key" ON "Room"("roomNumber");
