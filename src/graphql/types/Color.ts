import { prisma } from '../../lib/prisma'
import { builder } from '../builder'

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