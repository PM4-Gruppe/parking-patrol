import { CarModel } from './CarModel'
import { Color } from './Color'

export interface ParkedCar {
  numberPlate: String
  //controlTime: DateTime
  carModel: CarModel
  carColor: Color
  latitude: GLfloat
  longitude: GLfloat
  carInspector: String
  photoPath: String
}
