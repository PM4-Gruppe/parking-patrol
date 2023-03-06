import { builder } from '../builder';

builder.prismaObject('VehicleOwner', {
  fields: (t) => ({
    id: t.exposeID('id'),
    firstname: t.exposeString('firstname'),
    lastname: t.exposeString('lastname')
  })
})