import React, { useState } from 'react'
import { getPhotoInformations } from '../../lib/photoAnalyzer'
import { TextBox } from '../atom/TextBox'

export const PhotoChoose: React.FC = () => {
  const [informationLicenceplate, setInformationLicenseplate] = useState<string>('Information')
  const defaultInformationBrand = 'Bitte geben Sie eine Marke ein.'
  const [informationBrand, setInformationBrand] = useState<string>(defaultInformationBrand)
  const defaultInformationModel = 'Bitte geben Sie ein Model ein.'
  const [informationModel, setInformationModel] = useState<string>(defaultInformationModel)
  const regex = new RegExp('[a-zA-Z]{2}[0-9]{1,6}$') //two letters and 1-6 numbers

  const [licensePlate, setLicensePlate] = useState('')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')

  function handleLicensePlate(licensePlate: string) {
    const isValidLicensePlate = regex.test(licensePlate)
    console.log('isValidLicensePlate', isValidLicensePlate)
    if (isValidLicensePlate) {
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
      const photoInformations = await getPhotoInformations(selectedImage)
      if (photoInformations?.licensePlate) {
        const licensePlate = photoInformations.licensePlate.sign
        handleLicensePlate(licensePlate)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="w-full md:w-96 p-2 border-2 border-gray-300 rounded-lg"
        />
      </div>

      <TextBox inputType="text" inputDefaultValue="Autonummer" informationText={informationLicenceplate} value={licensePlate} onChange={handleLicensePlate} />

      <TextBox inputType="text" inputDefaultValue="Marke" informationText={informationBrand} value={brand} onChange={handleBrand} />

      <TextBox inputType="text" inputDefaultValue="Modell" informationText={informationModel} value={model} onChange={handleModel} />

    </div >
  );

};

