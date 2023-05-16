/*
  Warnings:

  - The primary key for the `CarModel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `manufacturer` to the `ParkedCar` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ParkedCar" DROP CONSTRAINT "ParkedCar_model_fkey";

-- DropIndex
DROP INDEX "CarModel_modelName_key";

-- AlterTable
ALTER TABLE "CarModel" DROP CONSTRAINT "CarModel_pkey",
ADD CONSTRAINT "CarModel_pkey" PRIMARY KEY ("modelName", "manufacturer");

-- AlterTable
ALTER TABLE "ParkedCar" ADD COLUMN     "manufacturer" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ParkedCar" ADD CONSTRAINT "ParkedCar_model_manufacturer_fkey" FOREIGN KEY ("model", "manufacturer") REFERENCES "CarModel"("modelName", "manufacturer") ON DELETE RESTRICT ON UPDATE CASCADE;
