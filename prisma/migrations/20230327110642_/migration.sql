/*
  Warnings:

  - You are about to drop the column `Controller` on the `Parked_Car` table. All the data in the column will be lost.
  - Added the required column `Car_Inspector` to the `Parked_Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Parked_Car" DROP COLUMN "Controller",
ADD COLUMN     "Car_Inspector" VARCHAR(256) NOT NULL;
