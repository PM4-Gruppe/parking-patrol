import { builder } from '../builder';

builder.prismaObject('Vehicle', {
  fields: (t) => ({
    id: t.exposeID('id'),
    licensePlate: t.relation('licensePlate')
  })
})

builder.queryField('vehicles', (t) =>
  t.prismaField({
    type: ['Vehicle'],
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.vehicle.findMany({ ...query })
  })
)