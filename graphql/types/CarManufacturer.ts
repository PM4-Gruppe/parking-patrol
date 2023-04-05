import { builder } from '../builder'

builder.prismaObject('CarManufacturer', {
    fields: (t) => ({
        manufacturerName: t.exposeID('manufacturerName'),
    })
})