/*
  Warnings:

  - You are about to drop the `brackets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `brackets` DROP FOREIGN KEY `brackets_tournamentId_fkey`;

-- AlterTable
ALTER TABLE `events` ADD COLUMN `tournamentsInitialized` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `tournaments` ADD COLUMN `divisionsInitialized` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `brackets`;

-- CreateTable
CREATE TABLE `divisions` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tournamentId` VARCHAR(191) NOT NULL,
    `gender` ENUM('MEN', 'WOMEN', 'MIXED') NOT NULL DEFAULT 'MIXED',
    `level` ENUM('OPEN', 'A1', 'A2', 'B') NOT NULL DEFAULT 'OPEN',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `divisions` ADD CONSTRAINT `divisions_tournamentId_fkey` FOREIGN KEY (`tournamentId`) REFERENCES `tournaments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
