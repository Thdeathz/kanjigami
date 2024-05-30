/*
  Warnings:

  - Added the required column `productId` to the `Checkout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Checkout" ADD COLUMN     "productId" TEXT NOT NULL;
