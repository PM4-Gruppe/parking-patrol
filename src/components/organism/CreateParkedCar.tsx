import React, { createContext, useState } from 'react'
import { LocalEndpoint } from '../../lib/ApiEndpoints/LocalEndpoint'
import { Button } from '../atom/Button'
import { BackButton } from '../atom/BackButton'
import { ParkedCarForm } from '../molecule/ParkedCarForm'
import { toastError } from '../../lib/toasts'
import {
  CarInformations,
  ParkedCarContext,
  emptyParkedCar,
} from '../../lib/parkedCar'
import { toastSuccess } from '../../lib/toasts'
import { CREATE_PARKED_CAR } from '../../graphql/mutations/parkedCar.create'
import { useMutation } from '@apollo/client'

export const CreateParkedCar: React.FC = () => {
  const api = new LocalEndpoint()
  const [selectedImage, setSelectedImage] = useState<File>()
  const [carInformations, setCarInformations] = useState<CarInformations>({
    parkedCar: emptyParkedCar,
  })
  const [createParkedCar, { data, loading, error }] =
    useMutation(CREATE_PARKED_CAR)

  const toastSuccessMessage = 'Das Foto wurde erfolgreich hochgeladen!'
  const toastErrorMessage = 'Das Foto konnte nicht hochgeladen werden!'
  const toastChoosePhotoMessage = 'Bitte wählen Sie ein Foto aus!'

  const saveForm = async () => {
    if (!selectedImage) return
    const res = await api.createImage(selectedImage)
    if (!res) {
      toastError(toastErrorMessage)
      return
    }
    const imagePath = res.originalImagePath
    setCarInformations({
      ...carInformations,
      parkedCar: { ...carInformations.parkedCar, photoPath: imagePath },
    })
    await createParkedCar({
      variables: {
        numberPlate: carInformations.parkedCar.numberPlate,
        carModel: carInformations.parkedCar.model,
        carManufacturer: carInformations.parkedCar.manufacturer,
        carColor: carInformations.parkedCar.color,
        latitude: carInformations.parkedCar.latitude,
        longitude: carInformations.parkedCar.longitude,
        carInspector: carInformations.parkedCar.carInspector,
        photoPath: imagePath,
      },
    })
  }

  const handleSubmit = async () => {
    if (!selectedImage) {
      toastError(toastChoosePhotoMessage)
      return
    }
    try {
      await saveForm()
      resetForm()
      toastSuccess(toastSuccessMessage)
    } catch (error) {
      toastError(toastErrorMessage)
    }
  }

  const resetForm = () => {
    setCarInformations({
      parkedCar: { ...emptyParkedCar },
      alprStats: undefined,
      geoLocation: undefined,
    })
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <ParkedCarContext.Provider
        value={{ carInformations, setCarInformations }}
      >
        <ParkedCarForm
          setImage={(file) => {
            console.log('save file', file)
            setSelectedImage(file)
          }}
        />
      </ParkedCarContext.Provider>

      <div className="flex flex-grow-0 justify-between w-1/2">
        <BackButton label="Zurück" />
        <Button label="Speichern" onClick={handleSubmit} />
      </div>
    </div>
  )
}
