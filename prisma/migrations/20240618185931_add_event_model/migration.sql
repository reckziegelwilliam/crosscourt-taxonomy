/*
  Warnings:

  - You are about to drop the column `endDate` on the `tournaments` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `tournaments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `events` ADD COLUMN `content` JSON NULL;

-- AlterTable
ALTER TABLE `tournaments` DROP COLUMN `endDate`,
    DROP COLUMN `startDate`;
