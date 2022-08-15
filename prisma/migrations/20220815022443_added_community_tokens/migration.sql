/*
  Warnings:

  - You are about to drop the column `string_id` on the `system_communities` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[community_id]` on the table `system_communities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `community_id` to the `system_communities` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `system_communities_string_id_key` ON `system_communities`;

-- AlterTable
ALTER TABLE `system_communities` DROP COLUMN `string_id`,
    ADD COLUMN `community_id` VARCHAR(10) NOT NULL;

-- CreateTable
CREATE TABLE `system_community_tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `community_rid` INTEGER NOT NULL,
    `token_type` LONGTEXT NOT NULL,
    `token_value` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `system_communities_community_id_key` ON `system_communities`(`community_id`);

-- AddForeignKey
ALTER TABLE `system_community_tokens` ADD CONSTRAINT `system_community_tokens_community_rid_fkey` FOREIGN KEY (`community_rid`) REFERENCES `system_communities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
