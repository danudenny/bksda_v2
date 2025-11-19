/*
  Warnings:

  - You are about to drop the column `href` on the `Announcement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "href",
ALTER COLUMN "content" DROP DEFAULT;
