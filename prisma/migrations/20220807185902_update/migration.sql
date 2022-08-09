/*
  Warnings:

  - You are about to drop the `Jobboard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Jobboard`;

-- CreateTable
CREATE TABLE `Job` (
    `jobid` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `payType` VARCHAR(191) NOT NULL,
    `payRate` VARCHAR(191) NOT NULL,
    `postDate` DATETIME(3) NOT NULL,
    `dueDate` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`jobid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
