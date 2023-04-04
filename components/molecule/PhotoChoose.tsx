import React, { useState } from 'react'
import { getPhotoInformations } from '../../lib/photoAnalyzer'

export const PhotoChoose: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0]

    if (selectedImage) {
      const photoInformations = await getPhotoInformations(selectedImage)
      console.log(photoInformations)
      setSelectedImage(selectedImage);
    }
  }

  const handleSaveClick = async () => {
    try {
      if (!selectedImage) return;

      const body = new FormData();
      body.append('image', selectedImage);
      const res = await fetch('/api/image-storage', {
        method: 'POST',
        body: body,
      });
      console.log(await res.json());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-center mb-4">Please select a photo or take a new one!</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="w-full md:w-96 p-2 border-2 border-gray-300 rounded-lg"
      />
      <button disabled={!selectedImage} onClick={handleSaveClick}>Save</button>
    </div>
  );

}


