import React, { useState } from 'react';

export const PhotoTaker: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
  
    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedImage = event.target.files?.[0];
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage as Blob);
      reader.onload = () => {
        setImage(reader.result as string);
      };
    };
  
    return (
      <div>
        <input type="file" accept="image/*" onChange={handleImageSelect} />
        <button onClick={() => console.log('Selected image:', image)}>Select Image</button>
      </div>
    );
  };
  
  export default PhotoTaker;
