/*
  Warnings:

  - The primary key for the `Color` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Name` on the `Color` table. All the data in the column will be lost.
  - The primary key for the `Parkzone` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Latitude` on the `Parkzone` table. All the data in the column will be lost.
  - You are about to drop the column `Longitude` on the `Parkzone` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Parkzone` table. All the data in the column will be lost.
  - You are about to drop the column `ParkzoneType` on the `Parkzone` table. All the data in the column will be lost.
  - You are about to drop the column `Radius` on the `Parkzone` table. All the data in the column will be lost.
  - You are about to drop the `Car_Manufacturer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Car_Model` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Parked_Car` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Parkzone_Type` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[colorName]` on the table `Color` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[parkzoneName]` on the table `Parkzone` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `colorName` to the `Color` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Parkzone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Parkzone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parkzoneName` to the `Parkzone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parkzoneTypeName` to the `Parkzone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `radius` to the `Parkzone` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Car_Model" DROP CONSTRAINT "Car_Model_Manufacturer_fkey";

-- DropForeignKey
ALTER TABLE "Parked_Car" DROP CONSTRAINT "Parked_Car_Color_fkey";

-- DropForeignKey
ALTER TABLE "Parked_Car" DROP CONSTRAINT "Parked_Car_Model_fkey";

-- DropForeignKey
ALTER TABLE "Parkzone" DROP CONSTRAINT "Parkzone_ParkzoneType_fkey";

-- DropIndex
DROP INDEX "Color_Name_key";

-- DropIndex
DROP INDEX "Parkzone_Name_key";

-- AlterTable
ALTER TABLE "Color" DROP CONSTRAINT "Color_pkey",
DROP COLUMN "Name",
ADD COLUMN     "colorName" TEXT NOT NULL,
ADD CONSTRAINT "Color_pkey" PRIMARY KEY ("colorName");

-- AlterTable
ALTER TABLE "Parkzone" DROP CONSTRAINT "Parkzone_pkey",
DROP COLUMN "Latitude",
DROP COLUMN "Longitude",
DROP COLUMN "Name",
DROP COLUMN "ParkzoneType",
DROP COLUMN "Radius",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "parkzoneName" TEXT NOT NULL,
ADD COLUMN     "parkzoneTypeName" TEXT NOT NULL,
ADD COLUMN     "radius" DOUBLE PRECISION NOT NULL,
ADD CONSTRAINT "Parkzone_pkey" PRIMARY KEY ("parkzoneName");

-- DropTable
DROP TABLE "Car_Manufacturer";

-- DropTable
DROP TABLE "Car_Model";

-- DropTable
DROP TABLE "Parked_Car";

-- DropTable
DROP TABLE "Parkzone_Type";

-- CreateTable
CREATE TABLE "CarManufacturer" (
    "manufacturerName" TEXT NOT NULL,

    CONSTRAINT "CarManufacturer_pkey" PRIMARY KEY ("manufacturerName")
);

-- CreateTable
CREATE TABLE "CarModel" (
    "modelName" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,

    CONSTRAINT "CarModel_pkey" PRIMARY KEY ("modelName")
);

-- CreateTable
CREATE TABLE "ParkedCar" (
    "numberPlate" TEXT NOT NULL,
    "controlTime" TIMESTAMP(3) NOT NULL,
    "model" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "carInspector" VARCHAR(256) NOT NULL,
    "photoPath" TEXT NOT NULL,

    CONSTRAINT "ParkedCar_pkey" PRIMARY KEY ("numberPlate","controlTime")
);

-- CreateTable
CREATE TABLE "ParkzoneType" (
    "typeName" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ParkzoneType_pkey" PRIMARY KEY ("typeName")
);

-- CreateIndex
CREATE UNIQUE INDEX "CarManufacturer_manufacturerName_key" ON "CarManufacturer"("manufacturerName");

-- CreateIndex
CREATE UNIQUE INDEX "CarModel_modelName_key" ON "CarModel"("modelName");

-- CreateIndex
CREATE UNIQUE INDEX "ParkzoneType_typeName_key" ON "ParkzoneType"("typeName");

-- CreateIndex
CREATE UNIQUE INDEX "Color_colorName_key" ON "Color"("colorName");

-- CreateIndex
CREATE UNIQUE INDEX "Parkzone_parkzoneName_key" ON "Parkzone"("parkzoneName");

-- AddForeignKey
ALTER TABLE "CarModel" ADD CONSTRAINT "CarModel_manufacturer_fkey" FOREIGN KEY ("manufacturer") REFERENCES "CarManufacturer"("manufacturerName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkedCar" ADD CONSTRAINT "ParkedCar_model_fkey" FOREIGN KEY ("model") REFERENCES "CarModel"("modelName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkedCar" ADD CONSTRAINT "ParkedCar_color_fkey" FOREIGN KEY ("color") REFERENCES "Color"("colorName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parkzone" ADD CONSTRAINT "Parkzone_parkzoneTypeName_fkey" FOREIGN KEY ("parkzoneTypeName") REFERENCES "ParkzoneType"("typeName") ON DELETE RESTRICT ON UPDATE CASCADE;
