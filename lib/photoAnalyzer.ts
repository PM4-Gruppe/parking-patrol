import fetch from 'node-fetch'
import FormData from 'form-data'
import EXIF from 'exif-js'
import { PhotoInformation } from '../schemas/PhotoInformation'
import { LicensePlate } from '../schemas/LicensePlate'
import { Location } from '../schemas/Location'

export async function getPhotoInformations(photo: File): Promise<PhotoInformation> {
    //return Promise.resolve('hello world') 

    let licensePlate: LicensePlate;
    let location: Location;
    let photoInformation: PhotoInformation;
    //TODO add return statement and return type
    try {
        const plateNumber = await getCarInformations(photo)
        //TODO ev. remove LicensePlate interface -> use only PhotoInformation
        licensePlate = {
            sign: plateNumber
        }
        console.log(licensePlate)

        const geoInformations = await getGeoInformations(photo);
        const latitude = geoInformations?.GPSLatitude;
        const longitude = geoInformations?.GPSLongitude;
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
        location = {
            latitude: latitude,
            longitude: longitude
        }

        photoInformation = {
            licensePlate: licensePlate,
            location: location
        }
    } catch (error) {
        console.log(error)
        licensePlate = {
            sign: 'unknown'
        }
        location = {
            latitude: [0],
            longitude: [0]
        }
        photoInformation = {
            licensePlate: licensePlate,
            location: location
        }
    }
    return photoInformation
}

export async function getCarInformations(photo: File): Promise<String> {
    let plateNumber = '';
    const body = new FormData();
    body.append('regions', 'ch'); // Change to your country
    body.append('upload', photo as Blob)
    try {
        const res = await fetch('https://api.platerecognizer.com/v1/plate-reader/', {
            method: 'POST',
            headers: {
                Authorization: 'Token 6bccffbf869875312132100b49cc31466d88bf7c',
            },
            body: body,
        })
        const json = await res.json() as { results: { plate: string }[] }
        plateNumber = json.results[0].plate
    }
    catch (error) {
        console.log(error)
    }
    return plateNumber
}

async function getGeoInformations(photo: File): Promise<any> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function () {
            const exifData = EXIF.readFromBinaryFile(this.result as ArrayBuffer);
            resolve(exifData);
        };
        reader.onerror = function () {
            reject('Error reading file');
        };
        reader.readAsArrayBuffer(photo);
    });
}

