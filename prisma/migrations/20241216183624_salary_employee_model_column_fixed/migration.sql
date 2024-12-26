/*
  Warnings:

  - You are about to drop the column `salarySalary_id` on the `Employees` table. All the data in the column will be lost.
  - Added the required column `salary_id` to the `Employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employees" DROP COLUMN "salarySalary_id",
ADD COLUMN     "salary_id" UUID NOT NULL;
