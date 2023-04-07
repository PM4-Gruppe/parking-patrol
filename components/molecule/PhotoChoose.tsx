import React, { useState } from 'react'
import { getPhotoInformations } from '../../lib/photoAnalyzer'
import { TextBox } from '../atom/TextBox';

export const PhotoChoose: React.FC = () => {
  //TODO change informationText to corresponding information
  let informationText = 'Information'
  const [licensePlate, setLicensePlate] = useState<String>('')
  const [brand, setBrand] = useState<string>('')
  const [model, setModel] = useState<string>('')

  const handleImageSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedImage = event.target.files?.[0]

    if (selectedImage) {
      const photoInformations = await getPhotoInformations(selectedImage)
      if (photoInformations?.licensePlate)
        setLicensePlate(photoInformations.licensePlate.sign)
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

      <TextBox inputType="text" inputDefaultValue="Autonummer" informationText={informationText} value={licensePlate}/>

      <TextBox inputType="text" inputDefaultValue="Marke" informationText={informationText} value="" />

      <TextBox inputType="text" inputDefaultValue="Modell" informationText={informationText} value="" />

    </div >
  );

};
