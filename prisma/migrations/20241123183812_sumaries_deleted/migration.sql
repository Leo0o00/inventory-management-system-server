/*
  Warnings:

  - You are about to drop the `Expenses_Sumary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Purchases_sumary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sales_sumary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expenses_Sumary" DROP CONSTRAINT "Expenses_Sumary_expenses_category_id_fkey";

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "points_of_sales_id" SET DEFAULT 'b924a5fe-3435-4042-b1c2-b997e231bf42';

-- DropTable
DROP TABLE "Expenses_Sumary";

-- DropTable
DROP TABLE "Purchases_sumary";

-- DropTable
DROP TABLE "Sales_sumary";
