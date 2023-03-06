/*
  Warnings:

  - You are about to drop the `ParkedCar` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ParkedCar";

-- CreateTable
CREATE TABLE "VehicleOwner" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,

    CONSTRAINT "VehicleOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "licensePlateSign" TEXT NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LicensePlate" (
    "ownerId" TEXT NOT NULL,
    "sign" TEXT NOT NULL,

    CONSTRAINT "LicensePlate_pkey" PRIMARY KEY ("sign")
);

-- CreateIndex
CREATE UNIQUE INDEX "VehicleOwner_id_key" ON "VehicleOwner"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_id_key" ON "Vehicle"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LicensePlate_sign_key" ON "LicensePlate"("sign");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_licensePlateSign_fkey" FOREIGN KEY ("licensePlateSign") REFERENCES "LicensePlate"("sign") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicensePlate" ADD CONSTRAINT "LicensePlate_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "VehicleOwner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
