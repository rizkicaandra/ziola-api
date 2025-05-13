/*
  Warnings:

  - You are about to drop the column `role_id` on the `user_account` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_account" DROP CONSTRAINT "user_account_role_id_fkey";

-- AlterTable
ALTER TABLE "user_account" DROP COLUMN "role_id",
ADD COLUMN     "user_role_id" INTEGER;

-- AddForeignKey
ALTER TABLE "user_account" ADD CONSTRAINT "user_account_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "user_role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
