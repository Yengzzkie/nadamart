/*
  Warnings:

  - The `image` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "condition" SET DEFAULT 'USED_GOOD',
DROP COLUMN "image",
ADD COLUMN     "image" TEXT[];
