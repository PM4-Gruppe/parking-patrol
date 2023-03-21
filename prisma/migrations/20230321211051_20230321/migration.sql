/*
  Warnings:

  - You are about to drop the `LicensePlate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vehicle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VehicleOwner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LicensePlate" DROP CONSTRAINT "LicensePlate_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_licensePlateSign_fkey";

-- DropTable
DROP TABLE "LicensePlate";

-- DropTable
DROP TABLE "Vehicle";

-- DropTable
DROP TABLE "VehicleOwner";

-- CreateTable
CREATE TABLE "Car_Manufacturer" (
    "Name" TEXT NOT NULL,

    CONSTRAINT "Car_Manufacturer_pkey" PRIMARY KEY ("Name")
);

-- CreateTable
CREATE TABLE "Car_Model" (
    "Model" TEXT NOT NULL,
    "Manufacturer" TEXT NOT NULL,

    CONSTRAINT "Car_Model_pkey" PRIMARY KEY ("Model")
);

-- CreateTable
CREATE TABLE "Color" (
    "Name" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("Name")
);

-- CreateTable
CREATE TABLE "Parked_Car" (
    "Number_Plate" TEXT NOT NULL,
    "Control_Time" TIMESTAMP(3) NOT NULL,
    "Model" TEXT NOT NULL,
    "Color" TEXT NOT NULL,
    "Latitude" DOUBLE PRECISION NOT NULL,
    "Longitude" DOUBLE PRECISION NOT NULL,
    "Controller" VARCHAR(32) NOT NULL,
    "Photo_Path" TEXT NOT NULL,

    CONSTRAINT "Parked_Car_pkey" PRIMARY KEY ("Number_Plate","Control_Time")
);

-- CreateTable
CREATE TABLE "Parkzone_Type" (
    "Parkzone_Type" TEXT NOT NULL,
    "Description" TEXT,

    CONSTRAINT "Parkzone_Type_pkey" PRIMARY KEY ("Parkzone_Type")
);

-- CreateTable
CREATE TABLE "Parkzone" (
    "Name" TEXT NOT NULL,
    "ParkzoneType" TEXT NOT NULL,
    "Latitude" DOUBLE PRECISION NOT NULL,
    "Longitude" DOUBLE PRECISION NOT NULL,
    "Radius" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Parkzone_pkey" PRIMARY KEY ("Name")
);

-- CreateIndex
CREATE UNIQUE INDEX "Car_Manufacturer_Name_key" ON "Car_Manufacturer"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Car_Model_Model_key" ON "Car_Model"("Model");

-- CreateIndex
CREATE UNIQUE INDEX "Color_Name_key" ON "Color"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Parkzone_Type_Parkzone_Type_key" ON "Parkzone_Type"("Parkzone_Type");

-- CreateIndex
CREATE UNIQUE INDEX "Parkzone_Name_key" ON "Parkzone"("Name");

-- AddForeignKey
ALTER TABLE "Car_Model" ADD CONSTRAINT "Car_Model_Manufacturer_fkey" FOREIGN KEY ("Manufacturer") REFERENCES "Car_Manufacturer"("Name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parked_Car" ADD CONSTRAINT "Parked_Car_Model_fkey" FOREIGN KEY ("Model") REFERENCES "Car_Model"("Model") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parked_Car" ADD CONSTRAINT "Parked_Car_Color_fkey" FOREIGN KEY ("Color") REFERENCES "Color"("Name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parkzone" ADD CONSTRAINT "Parkzone_ParkzoneType_fkey" FOREIGN KEY ("ParkzoneType") REFERENCES "Parkzone_Type"("Parkzone_Type") ON DELETE RESTRICT ON UPDATE CASCADE;
