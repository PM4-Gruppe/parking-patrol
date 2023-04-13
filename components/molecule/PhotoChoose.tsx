import React, { useState } from 'react'
import { getPhotoInformations } from '../../lib/photoAnalyzer'
import { TextBox } from '../atom/TextBox'

export const PhotoChoose: React.FC = () => {
  //TODO change informationText to corresponding information
  const [informationLicenceplate, setInformationLicenseplate] = useState<string>('Information')
  const [informationBrandModel, setInformationBrandModel] = useState<string>('Information')
  const regex = new RegExp('([a-z]{2}|[A-Z]{2})([0-9]{1,6})') //two letters and 1-6 numbers

  const [licensePlate, setLicensePlate] = useState('')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')

  function checkLicensePlate(licensePlate: string): boolean {
    return regex.test(licensePlate)
  }

  const handleImageSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedImage = event.target.files?.[0]

    if (selectedImage) {
      const photoInformations = await getPhotoInformations(selectedImage)
      if (photoInformations?.licensePlate) {
        setLicensePlate(photoInformations.licensePlate.sign)
      }
    }
    if (checkLicensePlate(licensePlate)) {
      console.log('licencePlate 1', licensePlate)
      setInformationLicenseplate('Die eingegebene Autonummer ist korrekt.')
    } else {
      console.log('licencePlate 2', licensePlate)
      console.log(licensePlate === undefined)
      setInformationLicenseplate('Die eingegebene Autonummer ist nicht korrekt.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-center mb-4">Bitte wählen Sie ein Foto aus oder machen Sie ein neues Foto!</p>
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="w-full md:w-96 p-2 border-2 border-gray-300 rounded-lg"
        />
      </div>

      <TextBox inputType="text" inputDefaultValue="Autonummer" informationText={informationLicenceplate} value={licensePlate} onChange={setLicensePlate} />

      <TextBox inputType="text" inputDefaultValue="Marke" informationText={informationBrandModel} value={brand} onChange={setBrand} />

      <TextBox inputType="text" inputDefaultValue="Modell" informationText={informationBrandModel} value={model} onChange={setModel} />

    </div >
  );

};

