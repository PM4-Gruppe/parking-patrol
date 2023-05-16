import { builder } from '../builder'
import { prisma } from '../../lib/prisma'

builder.prismaObject('CarModel', {
    fields: (t) => ({
        modelName: t.exposeID('modelName'),
        carManufacturer: t.relation('carManufacturer'),
    })
})

builder.queryField('carModel', (t) =>
  t.prismaField({
    type: ['CarModel'],
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.carModel.findMany({ ...query }),
  })
)