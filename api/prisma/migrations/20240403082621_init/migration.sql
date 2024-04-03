/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Stack` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Event_slug_id_key";

-- DropIndex
DROP INDEX "Stack_slug_id_key";

-- CreateTable
CREATE TABLE "_FollowedStacks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FollowedStacks_AB_unique" ON "_FollowedStacks"("A", "B");

-- CreateIndex
CREATE INDEX "_FollowedStacks_B_index" ON "_FollowedStacks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Stack_slug_key" ON "Stack"("slug");

-- AddForeignKey
ALTER TABLE "_FollowedStacks" ADD CONSTRAINT "_FollowedStacks_A_fkey" FOREIGN KEY ("A") REFERENCES "Stack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowedStacks" ADD CONSTRAINT "_FollowedStacks_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
