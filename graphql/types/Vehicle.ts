import { builder } from '../builder';

/*builder.prismaObject('Parked_Car', {
  fields: (t) => ({
    model: t.exposeID('Model'),
  })
})*/

/*builder.queryField('cars', (t) =>
  t.prismaField({
    type: ['Parked_Car'],
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.parked_Car.findMany({ ...query })
  })
)*/