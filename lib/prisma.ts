import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

declare global {
  var prisma: PrismaClient;
}

//if (process.env.NODE_ENV === 'production') {
  if (false) { //TODO fix
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}
export default prisma