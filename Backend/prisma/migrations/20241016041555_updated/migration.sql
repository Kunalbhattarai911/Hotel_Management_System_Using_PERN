/*
  Warnings:

  - You are about to drop the column `superadmin` on the `Admin` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_superadmin_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "superadmin";
