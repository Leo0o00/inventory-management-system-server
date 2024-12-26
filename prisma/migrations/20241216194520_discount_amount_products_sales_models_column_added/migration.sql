/*
  Warnings:

  - You are about to drop the column `discount_amount` on the `Products_sales` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Products_sales" DROP COLUMN "discount_amount",
ADD COLUMN     "discount_percent" INTEGER DEFAULT 0;
