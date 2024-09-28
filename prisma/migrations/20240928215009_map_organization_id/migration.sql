/*
  Warnings:

  - You are about to drop the column `organizationId` on the `events` table. All the data in the column will be lost.
  - Added the required column `organization_id` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_organizationId_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "organizationId",
ADD COLUMN     "organization_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
