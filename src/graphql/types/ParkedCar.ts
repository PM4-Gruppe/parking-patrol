import { prisma } from '../../lib/prisma'
import { builder } from '../builder'

builder.prismaObject('ParkedCar', {
  fields: (t) => ({
    numberPlate: t.exposeID('numberPlate'),
    controlTime: t.field({
      type: 'Date',
      resolve: () => new Date()
    }),
    carModel: t.relation('carModel'),
    carColor: t.relation('carColor'),
    latitude: t.exposeFloat('latitude'),
    longitude: t.exposeFloat('longitude'),
    carInspector: t.exposeString('carInspector'),
    photoPath: t.exposeString('photoPath'),
  }),
})

builder.queryField('parkedCars', (t) =>
  t.prismaField({
    type: ['ParkedCar'],
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.parkedCar.findMany({ ...query }),
  })
)

builder.mutationField('createParkedCar', (t) =>
  t.prismaField({
    type: 'ParkedCar',
    args: {
      numberPlate: t.arg.string({ required: true }),
      carModel: t.arg.string({ required: true }),
      carManufacturer: t.arg.string({ required: true }),
      carColor: t.arg.string({ required: true }),
      latitude: t.arg.float({ required: true }),
      longitude: t.arg.float({ required: true }),
      carInspector: t.arg.string({ required: true }),
      photoPath: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx) => {
      const {
        numberPlate,
        carModel,
        carManufacturer,
        carColor,
        latitude,
        longitude,
        carInspector,
        photoPath,
      } = args

      return prisma.parkedCar.create({
        ...query,
        data: {
          numberPlate,
          controlTime: new Date().toISOString(),
          carModel: {
            connect: {
              CarModel_pkey: {
                modelName: carModel,
                manufacturer: carManufacturer,
              },
            },
          },
          carColor: {
            connect: { colorName: carColor },
          },
          latitude,
          longitude,
          carInspector,
          photoPath,
        },
        include: { carModel: true },
      })
    },
  })
)
