import { ParkedCar } from '../schemas/ParkedCar'

export const parkedCars: ParkedCar[] = [
  {
    numberPlate: 'AI14075',
    carModel: { modelName: 'alt', carManufacturer: { manufacturerName: 'BMW' } },
    carColor: { colorName: 'black' },
    latitude: 60.1699,
    longitude: 24.9384,
    carInspector: 'Vali',
    photoPath: 'AI14075-LU98485_BMW_Volvo.jpeg',
  },
]
