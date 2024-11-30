/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Products_categories` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "points_of_sales_id" SET DEFAULT 'b924a5fe-3435-4042-b1c2-b997e231bf42';

-- CreateIndex
CREATE UNIQUE INDEX "Products_categories_name_key" ON "Products_categories"("name");
