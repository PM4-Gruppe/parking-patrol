import { prisma } from '../../lib/prisma'
import { builder } from '../builder'
import { prisma } from '../../lib/prisma'

builder.prismaObject('CarManufacturer', {
    fields: (t) => ({
        manufacturerName: t.exposeID('manufacturerName'),
    })
})

builder.queryField('carManufacturers', (t) =>
<<<<<<< HEAD
  t.prismaField({
    type: ['CarManufacturer'],
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.carManufacturer.findMany({ ...query }),
  })
=======
    t.prismaField({
        type: ['CarManufacturer'],
        resolve: (query, _parent, _args, _ctx, _info) =>
            prisma.carManufacturer.findMany({ ...query }),
    })
>>>>>>> dev
)