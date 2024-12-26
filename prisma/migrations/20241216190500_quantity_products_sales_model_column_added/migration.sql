/*
  Warnings:

  - Added the required column `quantity` to the `Products_sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products_sales" ADD COLUMN     "quantity" INTEGER NOT NULL;
