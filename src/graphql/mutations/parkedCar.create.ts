import { gql } from '@apollo/client'

export const CREATE_PARKED_CAR = gql`
  mutation createParkedCar(
    $numberPlate: String!
    $carModel: String!
    $carManufacturer: String!
    $carColor: String!
    $latitude: Float!
    $longitude: Float!
    $carInspector: String!
    $photoPath: String!
  ) {
    createParkedCar(
      numberPlate: $numberPlate
      carModel: $carModel
      carManufacturer: $carManufacturer
      carColor: $carColor
      latitude: $latitude
      longitude: $longitude
      carInspector: $carInspector
      photoPath: $photoPath
    ) {
      numberPlate
      carModel {
        carManufacturer {
          manufacturerName
        }
        modelName
      }
      carColor {
        colorName
      }
      latitude
      longitude
      carInspector
      photoPath
    }
  }
`
