import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient;
}

//if (process.env.NODE_ENV === 'production') {
  /**
   * from: https://www.prisma.io/blog/fullstack-nextjs-graphql-prisma-2-fwpc6ds155
   * Then if you are not in a production environment, Prisma will be attached to the global object so that you do not exhaust the database connection limit.
   * For more details, check out the documentation for Next.js and Prisma Client best practices. (link: https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices)
   */
  if (false) { //TODO fix
    prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}
export default prisma