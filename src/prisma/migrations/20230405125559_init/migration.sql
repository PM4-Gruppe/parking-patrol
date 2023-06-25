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
CREATE TABLE "Color" (
    "colorName" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("colorName")
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
CREATE TABLE "Parkzone" (
    "parkzoneName" TEXT NOT NULL,
    "parkzoneTypeName" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "radius" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Parkzone_pkey" PRIMARY KEY ("parkzoneName")
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
CREATE UNIQUE INDEX "Color_colorName_key" ON "Color"("colorName");

-- CreateIndex
CREATE UNIQUE INDEX "Parkzone_parkzoneName_key" ON "Parkzone"("parkzoneName");

-- CreateIndex
CREATE UNIQUE INDEX "ParkzoneType_typeName_key" ON "ParkzoneType"("typeName");

-- AddForeignKey
ALTER TABLE "CarModel" ADD CONSTRAINT "CarModel_manufacturer_fkey" FOREIGN KEY ("manufacturer") REFERENCES "CarManufacturer"("manufacturerName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkedCar" ADD CONSTRAINT "ParkedCar_model_fkey" FOREIGN KEY ("model") REFERENCES "CarModel"("modelName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkedCar" ADD CONSTRAINT "ParkedCar_color_fkey" FOREIGN KEY ("color") REFERENCES "Color"("colorName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parkzone" ADD CONSTRAINT "Parkzone_parkzoneTypeName_fkey" FOREIGN KEY ("parkzoneTypeName") REFERENCES "ParkzoneType"("typeName") ON DELETE RESTRICT ON UPDATE CASCADE;
