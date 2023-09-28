/*
  Warnings:

  - Made the column `is_closed` on table `rooms` required. This step will fail if there are existing NULL values in that column.
  - Made the column `img` on table `songs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `audio` on table `songs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `votos` on table `songs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "rooms" ALTER COLUMN "is_closed" SET NOT NULL;

-- AlterTable
ALTER TABLE "songs" ALTER COLUMN "img" SET NOT NULL,
ALTER COLUMN "audio" SET NOT NULL,
ALTER COLUMN "votos" SET NOT NULL;
