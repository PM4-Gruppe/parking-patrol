import { ParkzoneType } from './ParkzoneType';

export interface Parkzone {
    parkzoneName: String
    parkzoneType: ParkzoneType
    latitude: GLfloat
    longitude: GLfloat
    radius: GLfloat
}