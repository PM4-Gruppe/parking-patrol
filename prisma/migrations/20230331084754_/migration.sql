/*
  Warnings:

  - The primary key for the `ParkedCar` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/

-- AlterTable
ALTER TABLE "ParkedCar" DROP CONSTRAINT "ParkedCar_pkey",
ADD CONSTRAINT "ParkedCar_pkey" PRIMARY KEY ("numberPlate", "controlTime");
