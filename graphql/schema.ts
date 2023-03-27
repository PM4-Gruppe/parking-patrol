import { builder } from './builder';
import './types/Vehicle'
import './types/LicensePlate'

export const schema = builder.toSchema()