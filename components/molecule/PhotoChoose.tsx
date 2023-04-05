import React, { useState } from 'react'
import { getPhotoInformations } from '../../lib/photoAnalyzer'

export const PhotoChoose: React.FC = () => {
  const [licensePlate, setLicensePlate] = useState<String>('')

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
      <p className="text-center mb-4">Please select a photo or take a new one!</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="w-full md:w-96 p-2 border-2 border-gray-300 rounded-lg"
      />
      {licensePlate
        ? `The following sign was recognized: ${licensePlate}`
        : 'Upload a image'}
    </div>
  );

};
