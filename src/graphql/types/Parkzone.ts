import { prisma } from '../../lib/prisma'
import { builder } from '../builder'

builder.prismaObject('Parkzone', {
  fields: (t) => ({
    parkzoneName: t.exposeID('parkzoneName'),
    parkzoneType: t.relation('parkzoneType'),
    latitude: t.exposeFloat('latitude'),
    longitude: t.exposeFloat('longitude'),
    radius: t.exposeFloat('radius'),
  })
})

builder.queryField('parkzones', (t) =>
  t.prismaField({
    type: ['Parkzone'],
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.parkzone.findMany({ ...query })
  })
)

