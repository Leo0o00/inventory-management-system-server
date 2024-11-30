/*
  Warnings:

  - Added the required column `employee_id` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "employee_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employees"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
