import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createParkedCar(numberPlate, controlTime, modelName, manufacturer, colorName, latitude, longitude, carInspector, photoPath) {
  console.log('Before findCarModel')
  const carModel = await findCarModel(modelName, manufacturer);
  console.log('Before parkedCar')
  const newParkedCar = await prisma.parkedCar.create({
    data: {
      numberPlate,
      controlTime,
      carModel: { connect: { modelName: carModel.modelName, manufacturer: carModel.manufacturer } },
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
  console.log(`Created parked car with number plate ${newParkedCar.numberPlate}`)
  return newParkedCar;
}

async function findCarModel(modelName, manufacturer) {
  console.log(`Searching for car model ${modelName} from ${manufacturer}`)

  try {
  const searchModel = await prisma.carModel.findFirst({
    where: {
      modelName: modelName,
      manufacturer: manufacturer
    }
  })

  console.log(`Car model ${searchModel.modelName} from ${searchModel.manufacturer} found`)

  return searchModel;
  } catch (error) {
    console.error(error);
    throw new Error(`Error searching for car model ${modelName} from ${manufacturer}`)
  }
}