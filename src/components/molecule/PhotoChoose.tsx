import React, { useState } from 'react'
import Image from 'next/image'
import jwt_decode from 'jwt-decode'
import { getPhotoInformations } from '../../lib/photoAnalyzer'
import { isValidLicensePlate } from '../../lib/isValidLicensePlate'
import { Button } from '../atom/Button'
import { BackButton } from '../atom/BackButton'
import { useRouter } from 'next/router'
import { LocalEndpoint } from '../../lib/ApiEndpoints/LocalEndpoint'
import { toastSuccess } from '../../lib/toasts'
import { toastError } from '../../lib/toasts'
import { SelectModel } from '../atom/SelectModel'
import { SelectManufacturer } from '../atom/SelectManufacturer'
import { ParkedCar } from '@prisma/client'
import { ClientTextBox } from '../atom/ClientTextBox'

export const PhotoChoose: React.FC = () => {
  const router = useRouter()
  const api = new LocalEndpoint()

  const [formData, setFormData] = useState<ParkedCar>()

  const [informationLicenceplate, setInformationLicenseplate] = useState('Information')
  const [selectedImageURL, setSelectedImageURL] = useState('')
  const [selectedImage, setSelectedImage] = useState<File>()

  const [licensePlate, setLicensePlate] = useState('')

  const toastSuccessMessage = 'Das Foto wurde erfolgreich hochgeladen!'
  const toastErrorMessage = 'Das Foto konnte nicht hochgeladen werden!'
  const toastChoosePhotoMessage = 'Bitte wählen Sie ein Foto aus!'

  //TODO: Funktion auslagern
  function handleLicensePlate(licensePlate: string) {
    const doneMessage = '✅'
    const upperLicensePlate = licensePlate.toUpperCase()
    if (isValidLicensePlate(licensePlate)) {
      setInformationLicenseplate(doneMessage)
      setLicensePlate(upperLicensePlate)
      console.log('in handleLicensePlate', upperLicensePlate)
      setFormData({ numberPlate: upperLicensePlate })
      console.log('FormData = ', formData)
    } else {
      setInformationLicenseplate('Autonummer überprüfen!')
      setLicensePlate(upperLicensePlate)
    }
  }

  //TODO: Funktion auslagern
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
      if (photoInformations?.location) {
        const latitude = photoInformations.location.Latitude
        const longitude = photoInformations.location.Longitude
        console.log('latitude', latitude)
        console.log('Longitude: ', longitude)
        setFormData({ ...formData, latitude: latitude, longitude: longitude })
      } else {
        const defaultLatitude = 0
        const defaultLongitude = 0
        setFormData({ ...formData, latitude: defaultLatitude, longitude: defaultLongitude })
        console.log('FormData = ', formData)
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
      console.log('Last FormData Status:', formData)
      /*
      DOES NOT WORK
      const token = localStorage.getItem('token')
      const decodedToken: any = jwt_decode(token)
      const carInspector = decodedToken.name
      console.log('carInspector', carInspector)
      */
      const res = await api.postRequest('/image-storage/image-upload', body)

      if (res) {
        toastSuccess(toastSuccessMessage)

        //TODO: no redirection => reset form
        /*
        setTimeout(() => {
          router.push('/')
        }, 1000)
        */
      }
      else toastError(toastErrorMessage)
    } catch (error) {
      toastError(toastErrorMessage)
    }

    /*
    createParkedCar({
      variables: {
        numberPlate: 'ag 456', DONE
        carModel: 'X5', DONE
        carManufacturer: 'BMW', DONE
        carColor: 'Schwarz', => add SelectColor JSX Component
        latitude: 2000, DONE => test with working picture
        longitude: 2000, => test with working picture
        carInspector: 'Maximilian', => get from Auth0
        photoPath:
          'https://audimediacenter-a.akamaihd.net/system/production/media/88384/images/686b93f028b85460bbd41af80d05cb18571bb383/A1916257_x500.jpg?1582591384',
      },
    })
    */

  }

  //TODO
  //@ValiSensei: Wieso ist das hier?
  const addFormData = (key: string, value: any): void => {
    let data = { ...formData }
    setFormData({data, key: value})
  }

  /*
  const handleBackButton = () => {
    router.back()
  }
  */
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

      <ClientTextBox
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
      <SelectModel
        manufacturer={formData?.manufacturer}
        addFormData={(value: string) =>
          setFormData({ ...formData, model: value })
        } />

      <div className="flex flex-grow-0 justify-between w-1/2">
        <BackButton label="Zurück" />
        <Button label="Prüfen" onClick={handleSubmit} />
      </div>
    </div>
  )
}
