import { builder } from './builder';
import './types/CarManufacturer';
import './types/CarModel';
import './types/Color';
import './types/ParkedCar';
import './types/Parkzone';
import './types/ParkzoneType';


export const schema = builder.toSchema()