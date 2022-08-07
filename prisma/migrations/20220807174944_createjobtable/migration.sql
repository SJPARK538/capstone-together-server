-- CreateTable
CREATE TABLE `Jobboard` (
    `jobid` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `payType` VARCHAR(191) NOT NULL,
    `payRate` VARCHAR(191) NOT NULL,
    `postDate` DATETIME(3) NOT NULL,
    `dueDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`jobid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
