import fetch from 'node-fetch'
import FormData from 'form-data'
import fs, { PathLike } from 'fs'


function getPhotoInformations(photoPath: PathLike) {
    let body = new FormData();
    body.append('upload', fs.createReadStream(photoPath));
    // Or body.append('upload', base64Image);
    body.append('regions', 'ch'); // Change to your country
    fetch('https://api.platerecognizer.com/v1/plate-reader/', {
        method: 'POST',
        headers: {
            Authorization: 'Token my-token3a0effff73919f898b69ac65a32dc12347769564',
        },
        body: body,
    })
        .then((res: Response) => res.json())
        .then((json: JSON) => console.log(json))
        .catch((err: Error) => {
            console.log(err);
        });
}



export default getPhotoInformations;