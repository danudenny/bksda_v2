/*
  Warnings:

  - You are about to drop the column `category` on the `Announcement` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Announcement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "category",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AnnouncementCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnnouncementCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnnouncementCategory_name_key" ON "AnnouncementCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AnnouncementCategory_slug_key" ON "AnnouncementCategory"("slug");

-- CreateIndex
CREATE INDEX "AnnouncementCategory_slug_idx" ON "AnnouncementCategory"("slug");

-- CreateIndex
CREATE INDEX "Announcement_categoryId_idx" ON "Announcement"("categoryId");

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "AnnouncementCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
