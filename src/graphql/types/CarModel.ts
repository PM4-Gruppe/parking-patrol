import { prisma } from '../../lib/prisma'
import { builder } from '../builder'

builder.prismaObject('CarModel', {
  fields: (t) => ({
    modelName: t.exposeID('modelName'),
    carManufacturer: t.relation('carManufacturer'),
  }),
})

builder.queryField('carModels', (t) =>
  t.prismaField({
    type: ['CarModel'],
    args: {
      where: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.carModel.findMany({
        ...query,
        where: {
          carManufacturer: { manufacturerName: _args.where },
        },
      }),
  })
)
