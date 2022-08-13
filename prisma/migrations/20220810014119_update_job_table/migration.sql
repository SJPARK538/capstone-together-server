/*
  Warnings:

  - The primary key for the `Job` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Job` DROP FOREIGN KEY `Job_user_id_fkey`;

-- AlterTable
ALTER TABLE `Job` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `jobid` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_jobid_fkey` FOREIGN KEY (`jobid`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
