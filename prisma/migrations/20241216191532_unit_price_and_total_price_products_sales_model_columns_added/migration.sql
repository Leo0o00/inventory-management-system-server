/*
  Warnings:

  - Added the required column `total_price` to the `Products_sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_price` to the `Products_sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products_sales" ADD COLUMN     "total_price" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "unit_price" DECIMAL(10,2) NOT NULL;
