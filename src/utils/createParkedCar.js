import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createParkedCar(numberPlate, controlTime, modelName, colorName, latitude, longitude, carInspector, photoPath) {
  const newParkedCar = await prisma.parkedCar.create({
    data: {
      numberPlate,
      controlTime,
      carModel: { connect: { modelName: modelName } },
      carColor: { connect: { colorName: colorName } },
      latitude,
      longitude,
      carInspector,
      photoPath,
    },
    include: {
      carModel: true,
      carColor: true
    }
  })
  return newParkedCar;
}