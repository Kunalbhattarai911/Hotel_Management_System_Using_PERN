/*
  Warnings:

  - A unique constraint covering the columns `[isSuperAdmin]` on the table `SuperAdmin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SuperAdmin" ADD COLUMN     "isSuperAdmin" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_isSuperAdmin_key" ON "SuperAdmin"("isSuperAdmin");
