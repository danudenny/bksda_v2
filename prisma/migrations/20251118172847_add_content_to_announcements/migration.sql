-- AlterTable
ALTER TABLE "Announcement" ADD COLUMN     "content" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "href" DROP NOT NULL;
