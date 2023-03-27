import { builder } from '../builder'

builder.prismaObject('Parked_Car', {
  fields: (t) => ({
    sign: t.exposeString('Number_Plate'),
  })
})

// Write a query to get all license plates
builder.queryField('LicensePlates', (t) =>
  t.prismaField({
    type: ['Parked_Car'],
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.parked_Car.findMany({ ...query })
  })
)
