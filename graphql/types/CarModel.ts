import { builder } from '../builder'

builder.prismaObject('CarModel', {
    fields: (t) => ({
        modelName: t.exposeID('modelName'),
        carManufacturer: t.relation('carManufacturer'),
    })
})