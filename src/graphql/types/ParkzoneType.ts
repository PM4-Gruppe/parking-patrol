import { builder } from '../builder'

builder.prismaObject('ParkzoneType', {
    fields: (t) => ({
        typeName: t.exposeID('typeName'),
        //description: t.exposeString('description'),
    })
})