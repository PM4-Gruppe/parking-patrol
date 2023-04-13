import React, { useState } from 'react'
import { getPhotoInformations } from '../../lib/photoAnalyzer'

export const PhotoChoose: React.FC = () => {
  const [licensePlate, setLicensePlate] = useState<String>('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedImage = event.target.files?.[0]

    if (selectedImage) {
      const photoInformations = await getPhotoInformations(selectedImage)
      setSelectedImage(selectedImage);
      if (photoInformations?.licensePlate)
        setLicensePlate(photoInformations.licensePlate.sign)
    }
  }

  const handleSaveClick = async () => {
    setUploading(true);
    try {
      if (!selectedImage) return;

      const body = new FormData();
      body.append('image', selectedImage);
      const res = await fetch('/api/image-storage/image-upload', {
        method: 'POST',
        body: body,
      });
      console.log(await res.json());
    } catch (error) {
      console.error(error);
    }
    setUploading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-center mb-4">Bitte wählen Sie ein Foto aus oder machen Sie ein neues Foto!</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="w-full md:w-96 p-2 border-2 border-gray-300 rounded-lg"
      />
      {licensePlate
        ? `Das folgende Schild wurde erkannt: ${licensePlate}`
        : ''}
      <button disabled={!selectedImage || uploading} onClick={handleSaveClick}>Save</button>
    </div>
  );

};
