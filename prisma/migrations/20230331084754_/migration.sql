/*
  Warnings:

  - The primary key for the `ParkedCar` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "ParkedCar_numberPlate_key";

-- AlterTable
ALTER TABLE "ParkedCar" DROP CONSTRAINT "ParkedCar_pkey",
ADD CONSTRAINT "ParkedCar_pkey" PRIMARY KEY ("numberPlate", "controlTime");
