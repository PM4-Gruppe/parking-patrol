import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_PARKED_CAR } from '../../graphql/mutations/parkedCar.create'
import { getPhotoInformations } from '../../lib/photoAnalyzer'
import { TextBox } from '../atom/TextBox'
import { SelectBox } from '../atom/SelectBox'
import { ClientTextBox } from '../atom/ClientTextBox'
import { ClientSelectBox } from '../atom/ClientSelectBox'
import { isValidLicensePlate } from '../../lib/isValidLicensePlate'
import Image from 'next/image'
import { Button } from '../atom/Button'
import { useRouter } from 'next/router'
import { LocalEndpoint } from '../../lib/ApiEndpoints/LocalEndpoint'
import { toastSuccess } from '../../lib/toasts'
import { toastError } from '../../lib/toasts'

//ff. changes
import { DocumentNode, gql, useQuery } from '@apollo/client'
import { SelectModel } from '../atom/SelectModel'
import { SelectManufacturer } from '../atom/SelectManufacturer'
import { ParkedCar } from '@prisma/client'

export const PhotoChoose: React.FC = () => {
  const router = useRouter()
  const api = new LocalEndpoint()
  //const [createParkedCar, { data, loading, error }] =
  // useMutation(CREATE_PARKED_CAR)

  const [formData, setFormData] = useState<ParkedCar>()
  // const { models, setModels } = useState()

  //const addFormData(key: string, value: string)

  const [informationLicenceplate, setInformationLicenseplate] =
    useState<string>('Information')
  const [selectedImageURL, setSelectedImageURL] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState<File>()

  const [licensePlate, setLicensePlate] = useState('')

  const toastSuccessMessage = 'Das Foto wurde erfolgreich hochgeladen!'
  const toastErrorMessage = 'Das Foto konnte nicht hochgeladen werden!'
  const toastChoosePhotoMessage = 'Bitte wählen Sie ein Foto aus!'

  function handleLicensePlate(licensePlate: string) {
    if (isValidLicensePlate(licensePlate)) {
      setInformationLicenseplate(doneMessage)
      setLicensePlate(licensePlate)
    } else {
      setInformationLicenseplate('Autonummer überprüfen!')
      setLicensePlate(licensePlate)
    }
  }

  const handleImageSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedImage = event.target.files?.[0]

    if (selectedImage) {
      const imageURL = URL.createObjectURL(selectedImage)
      setSelectedImageURL(imageURL)
      setSelectedImage(selectedImage)
      const photoInformations = await getPhotoInformations(selectedImage)
      if (photoInformations?.licensePlate) {
        const licensePlate = photoInformations.licensePlate.sign
        handleLicensePlate(licensePlate)
      }
    }
  }

  const handleSubmit = async () => {
    if (!selectedImage) {
      toastError(toastChoosePhotoMessage)
      return
    }
    const body = new FormData()
    body.append('image', selectedImage)
    try {
      const res = await api.postRequest('/image-storage/image-upload', body)

      if (res) toastSuccess(toastSuccessMessage)
      else toastError(toastErrorMessage)
    } catch (error) {
      toastError(toastErrorMessage)
    }

    createParkedCar({
      variables: {
        numberPlate: 'ag 456',
        carModel: 'X5',
        carManufacturer: 'BMW',
        carColor: 'Schwarz',
        latitude: 2000,
        longitude: 2000,
        carInspector: 'Maximilian',
        photoPath:
          'https://audimediacenter-a.akamaihd.net/system/production/media/88384/images/686b93f028b85460bbd41af80d05cb18571bb383/A1916257_x500.jpg?1582591384',
      },
    })
  }

  const addFormData = (key: string, value: string): void => {
    let data = { ...formData }
    //TODO setFormData()
  }

  const handleBackButton = () => {
    router.back()
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="displayflex flex-col items-center justify-center w-full p-2 file:bg-green-700 file:hover:bg-green-800 file:text-white text-white file:rounded-lg file:border-transparent my-2"
        />
      </div>

      {selectedImageURL && (
        <Image
          src={selectedImageURL}
          width={150}
          height={150}
          alt="Preview"
          className="my-2"
        />
      )}

      <TextBox
        inputType="text"
        inputDefaultValue="Autonummer"
        informationText={informationLicenceplate}
        value={licensePlate}
        onChange={handleLicensePlate}
      />

      <SelectManufacturer
        addFormData={(value: string) =>
          setFormData({ ...formData, manufacturer: value })
        }
      />
      <SelectModel manufacturer={formData?.manufacturer} />

      <div className="flex flex-grow-0 justify-between w-1/2">
        <Button label="Zurück" onClick={handleBackButton} />
        <Button label="Prüfen" onClick={handleSubmit} />
      </div>
    </div>
  )
}
