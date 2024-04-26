/*
  Warnings:

  - A unique constraint covering the columns `[content]` on the table `Kanji` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Kanji_content_key" ON "Kanji"("content");
