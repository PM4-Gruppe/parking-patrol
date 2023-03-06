import { builder } from '../builder'

builder.prismaObject('LicensePlate', {
  fields: (t) => ({
    owner: t.relation('owner')
  })
})
