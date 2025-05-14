-- CreateTable
CREATE TABLE `AuditResult` (
    `id` VARCHAR(191) NOT NULL,
    `auditId` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL,
    `accessibilityResults` VARCHAR(191) NOT NULL,
    `usabilityResults` VARCHAR(191) NOT NULL,
    `culturalResults` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AuditResult` ADD CONSTRAINT `AuditResult_auditId_fkey` FOREIGN KEY (`auditId`) REFERENCES `Audit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
