import { builder } from '../builder'

builder.prismaObject('ParkedCar', {
  fields: (t) => ({
    numberPlate: t.exposeString('numberPlate'),
    // TODO: controlTime: t.exposeInt('controlTime'),
    carModel: t.relation('carModel'),
    carColor: t.relation('carColor'),
    latitude: t.exposeFloat('latitude'),
    longitude: t.exposeFloat('longitude'),
    carInspector: t.exposeString('carInspector'),
    photoPath: t.exposeString('photoPath'),
  })
})

// Write a query to get all license plates
builder.queryField('NumberPlates', (t) =>
  t.prismaField({
    type: ['ParkedCar'],
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.parkedCar.findMany({ ...query })
  })
)
