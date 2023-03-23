import fetch from 'node-fetch'
import FormData from 'form-data'
import fs, { PathLike } from 'fs'
import EXIF from 'exif-js'
import { json } from 'stream/consumers';


function getPhotoInformations(photoPath: PathLike) {
    //TODO : Get the photo informations
    //Geo location
    //Plate number -> DONE -> need to be tested
    let plate: String = '';
    let location: JSON[] = [];
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
    .then((json: JSON) => plate = json.results[0].plate)
    .catch((err: Error) => {
        console.log(err);
    });  

    //TODO : Get the location of the photo
    //https://www.npmjs.com/package/react-native-geolocation-service
    const exif = getEXIF(photoPath);
    console.log(metaData);
    exif.then((metaData: JSON) => {
        const lat = metaData.GPSLatitude;
        const lon = metaData.GPSLongitude;
        const latRef = metaData.GPSLatitudeRef;
        const lonRef = metaData.GPSLongitudeRef;
        location.push({lat: lat, lon: lon, latRef: latRef, lonRef: lonRef});
    })
    return [plate, location];  
}

function getEXIF(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function() {
        EXIF.getData(img, function() {
          const exifData = EXIF.getAllTags(this);
          resolve(exifData);
        });
      };
      img.onerror = function() {
        reject('Error loading image');
      };
      img.src = filePath;
    });
  }



export default getPhotoInformations;