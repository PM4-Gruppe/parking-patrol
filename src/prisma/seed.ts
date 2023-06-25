// prisma/seed.ts
import { carManufacturer } from '../data/carManufacturer'
import { carModel } from '../data/carModel'
import { color } from '../data/color'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.carManufacturer.createMany({
    data: carManufacturer,
  });

  await prisma.carModel.createMany({
    data: carModel,
  });

  await prisma.color.createMany({
    data: color,
  });

}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })