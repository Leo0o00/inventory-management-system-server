-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "points_of_sales_id" UUID NOT NULL DEFAULT 'b924a5fe-3435-4042-b1c2-b997e231bf42';

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_points_of_sales_id_fkey" FOREIGN KEY ("points_of_sales_id") REFERENCES "Points_of_sales"("pos_id") ON DELETE RESTRICT ON UPDATE CASCADE;
