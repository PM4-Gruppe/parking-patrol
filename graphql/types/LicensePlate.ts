import { builder } from '../builder'

builder.prismaObject('LicensePlate', {
  fields: (t) => ({
    sign: t.exposeString('sign'),
    owner: t.relation('owner')
  })
})
