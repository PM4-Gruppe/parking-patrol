import React from 'react'

export const PhotoChoose: React.FC = () => {
  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0]
    const body = new FormData()

    body.append('regions', 'ch'); // Change to your country
    body.append('upload', selectedImage as Blob)

    try {
      const res = await fetch('https://api.platerecognizer.com/v1/plate-reader/', {
        method: 'POST',
        headers: {
          Authorization: 'Token 6bccffbf869875312132100b49cc31466d88bf7c',
        },
        body: body,
      })
      console.log(await res.json())
      // TODO make something useful with data
    }

    catch {
      // Fileupload not successfull
    }
    const handleSaveClick = async () => {
      if (!selectedImage) {
        return;
      }

      const body = new FormData();
      body.append('image', selectedImage);

      try {
        const res = await fetch('pages/api/image-storage/image-upload.js', {
          method: 'POST',
          body,
        });

        console.log(await res.json());
        // TODO handle response from server
      } catch (error) {
        console.error(error);
        // TODO handle error
      }

      return (
        <div>
          <input type="file" accept="image/*" onChange={handleImageSelect} />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      );
    };
  }
}
export default PhotoChoose;
