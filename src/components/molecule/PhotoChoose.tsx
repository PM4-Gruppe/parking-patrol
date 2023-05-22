import React, { useState } from 'react'
import Image from 'next/image'
import { getPhotoInformations } from '../../lib/photoAnalyzer'
import { isValidLicensePlate } from '../../lib/isValidLicensePlate'
import { SubmitButton } from '../atom/SubmitButton'
import { BackButton } from '../atom/BackButton'
import { SelectModel } from '../atom/SelectModel'
import { SelectManufacturer } from '../atom/SelectManufacturer'
import { ParkedCar } from '@prisma/client'
import { ClientTextBox } from '../atom/ClientTextBox'

export const PhotoChoose: React.FC = () => {
  const [formData, setFormData] = useState<ParkedCar>()

  const [informationLicenceplate, setInformationLicenseplate] = useState('Information')
  const [selectedImageURL, setSelectedImageURL] = useState('')
  const [selectedImage, setSelectedImage] = useState<File>()

  const [licensePlate, setLicensePlate] = useState('')

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
  
  /*
  createParkedCar({
    variables: {
      numberPlate: 'ag 456', DONE
      carModel: 'X5', DONE
      carManufacturer: 'BMW', DONE
      carColor: 'Schwarz', => add SelectColor JSX Component
      latitude: 2000, DONE => DONE
      longitude: 2000, => DONE
      carInspector: 'Maximilian', => get from Auth0 TODO
      photoPath: DONE => selectedImageURL
        'https://audimediacenter-a.akamaihd.net/system/production/media/88384/images/686b93f028b85460bbd41af80d05cb18571bb383/A1916257_x500.jpg?1582591384',
    },
  })
  */

  //TODO
  //@ValiSensei: Wieso ist das hier?
  const addFormData = (key: string, value: any): void => {
    let data = { ...formData }
    setFormData({data, key: value})
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
        <SubmitButton label="Prüfen" selectedImage={selectedImage} />
      </div>
    </div>
  )
}
