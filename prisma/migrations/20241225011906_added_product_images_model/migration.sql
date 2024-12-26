/*
  Warnings:

  - You are about to drop the column `img` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "img";

-- CreateTable
CREATE TABLE "Products_images" (
    "id" UUID NOT NULL,
    "image_name" TEXT NOT NULL,

    CONSTRAINT "Products_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Products_images_image_name_key" ON "Products_images"("image_name");

-- AddForeignKey
ALTER TABLE "Products_images" ADD CONSTRAINT "Products_images_id_fkey" FOREIGN KEY ("id") REFERENCES "Products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;
