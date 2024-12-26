/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Providers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Providers_email_key" ON "Providers"("email");
