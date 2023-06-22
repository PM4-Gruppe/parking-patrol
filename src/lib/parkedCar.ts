import { createContext } from 'react'
import { AlprStatistic } from '../schemas/AlprStatistic'
import { ParkedCar } from '@prisma/client'

export interface CarInformations {
  parkedCar: ParkedCar
  alprStats?: AlprStatistic
  geoLocation?: ExifReader.GpsTags
}

export const emptyParkedCar = {
  numberPlate: '',
  controlTime: new Date(),
  model: 'Nicht erkennbar',
  manufacturer: 'Nicht erkennbar',
  color: 'Nicht verfügbar',
  latitude: 0,
  longitude: 0,
  carInspector: '',
  photoPath: '',
}

class ParkedCarStore implements CarInformations {
  parkedCar = emptyParkedCar
}

export const ParkedCarContext = createContext<{
  carInformations: CarInformations | undefined
  setCarInformations: React.Dispatch<React.SetStateAction<CarInformations>>
}>({ carInformations: new ParkedCarStore(), setCarInformations: () => {} })
