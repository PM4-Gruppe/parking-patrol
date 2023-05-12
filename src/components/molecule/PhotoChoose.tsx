import React, { useState } from 'react'
import { getPhotoInformations } from '../../lib/photoAnalyzer'
import { TextBox } from '../atom/TextBox'
import { isValidLicensePlate } from '../../lib/isValidLicensePlate'
import Image from 'next/image'
import { Button } from '../atom/Button'
import { useRouter } from 'next/router'
import { LocalEndpoint } from '../../lib/ApiEndpoints/LocalEndpoint'

export const PhotoChoose: React.FC = () => {
  const router = useRouter()
  const api = new LocalEndpoint()

  const [informationLicenceplate, setInformationLicenseplate] = useState<string>('Information')
  const defaultInformationBrand = 'Bitte geben Sie eine Marke ein.'
  const [informationBrand, setInformationBrand] = useState<string>(defaultInformationBrand)
  const defaultInformationModel = 'Bitte geben Sie ein Model ein.'
  const [informationModel, setInformationModel] = useState<string>(defaultInformationModel)
  const [selectedImageURL, setSelectedImageURL] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState<File>()

  const [licensePlate, setLicensePlate] = useState('')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')

  function handleLicensePlate(licensePlate: string) {
    if (isValidLicensePlate(licensePlate)) {
      setInformationLicenseplate('done')
      setLicensePlate(licensePlate)
    } else {
      setInformationLicenseplate('Autonummer überprüfen!')
      setLicensePlate(licensePlate)
    }
  }

  function handleBrand(value: string) {
    setBrand(value)
    if (value.length === 0) {
      setInformationBrand(defaultInformationBrand)
    } else {
      setInformationBrand('done')
    }
  }

  function handleModel(value: string) {
    setModel(value)
    if (value.length === 0) {
      setInformationModel(defaultInformationModel)
    } else {
      setInformationModel('done')
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
    try {
      if (!selectedImage) return;

      const body = new FormData();
      body.append('image', selectedImage);
      const res = await api.postRequest('/image-storage/image-upload', body)
      console.log(await res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackButton = () => {
    router.back()
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div >
        <input
          type="file"
          title={'file'}
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

      <TextBox inputType="text" inputDefaultValue="Autonummer" informationText={informationLicenceplate} value={licensePlate} onChange={handleLicensePlate} />

      <TextBox inputType="text" inputDefaultValue="Marke" informationText={informationBrand} value={brand} onChange={handleBrand} />

      <TextBox inputType="text" inputDefaultValue="Modell" informationText={informationModel} value={model} onChange={handleModel} />

      <div className="flex flex-grow-0 justify-between w-1/2">
        <Button
          label="Zurück"
          onClick={handleBackButton}
        />
        <Button
          label="Prüfen"
          onClick={handleSubmit}
        />
      </div>
    </div >
  );

};

