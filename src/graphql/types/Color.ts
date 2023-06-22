import { builder } from '../builder'
import { prisma } from '../../lib/prisma'

builder.prismaObject('Color', {
    fields: (t) => ({
        colorName: t.exposeID('colorName'),
    })
})

builder.queryField('colors', (t) =>
    t.prismaField({
        type: ['Color'],
        resolve: (query, _parent, _args, _ctx, _info) =>
            prisma.color.findMany({ ...query }),
    })
)
