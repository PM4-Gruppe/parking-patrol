/*
  Warnings:

  - The primary key for the `Parkzone_Type` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Parkzone_Type` on the `Parkzone_Type` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Parkzone_Type` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Parkzone_Type` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Parkzone" DROP CONSTRAINT "Parkzone_ParkzoneType_fkey";

-- DropIndex
DROP INDEX "Parkzone_Type_Parkzone_Type_key";

-- AlterTable
ALTER TABLE "Parkzone_Type" DROP CONSTRAINT "Parkzone_Type_pkey",
DROP COLUMN "Parkzone_Type",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Parkzone_Type_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Parkzone_Type_id_key" ON "Parkzone_Type"("id");

-- AddForeignKey
ALTER TABLE "Parkzone" ADD CONSTRAINT "Parkzone_ParkzoneType_fkey" FOREIGN KEY ("ParkzoneType") REFERENCES "Parkzone_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
