-- CreateTable
CREATE TABLE `system_communities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `string_id` VARCHAR(10) NOT NULL,
    `name` LONGTEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_disabled` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `system_communities_string_id_key`(`string_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
