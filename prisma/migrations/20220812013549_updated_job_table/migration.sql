/*
  Warnings:

  - You are about to drop the column `jobid` on the `Job` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Job` DROP FOREIGN KEY `Job_jobid_fkey`;

-- AlterTable
ALTER TABLE `Job` DROP COLUMN `jobid`;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
