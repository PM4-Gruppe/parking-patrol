import React, { useState } from 'react';

export const PhotoChoose: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    setImage(URL.createObjectURL(selectedImage as Blob));
    /*const reader = new FileReader();
    if (typeof selectedImage !== 'undefined') {
      reader.readAsDataURL(selectedImage as Blob);
      reader.onload = () => {
        let url = URL.createObjectURL(selectedImage);
        setImage(reader.result as string);
      };
    }*/
  };
  console.log(image);
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageSelect} />
    </div>
  );
};

export default PhotoChoose;
