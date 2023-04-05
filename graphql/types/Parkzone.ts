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