import React from 'react'

interface ImageSelectProps {
  handleImage(arg0: File): void
}

export const ImageSelect: React.FC<ImageSelectProps> = ({handleImage}) => {

  const handleImageSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedImage = event.target.files?.[0]
    if (selectedImage) handleImage(selectedImage)
  }
  
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="displayflex flex-col items-center justify-center w-full p-2 file:bg-green-700 file:hover:bg-green-800 file:text-white text-white file:rounded-lg file:border-transparent my-2"
      />
    </div>
  )
}