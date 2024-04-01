/*
  Warnings:

  - A unique constraint covering the columns `[slug,id]` on the table `Stack` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Stack" ADD COLUMN     "slug" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Stack_slug_id_key" ON "Stack"("slug", "id");
