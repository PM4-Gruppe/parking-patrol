import { builder } from '../builder'

builder.prismaObject('Color', {
    fields: (t) => ({
        colorName: t.exposeID('colorName'),
    })
})