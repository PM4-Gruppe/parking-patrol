import { PhotoInformation } from '../schemas/PhotoInformation'
import ExifReader from 'exifreader';

export async function getPhotoInformations(photo: File): Promise<PhotoInformation | undefined> {
    try {
        const geoInformations = await getGeoInformations(photo)
        const plateNumber = await getCarInformations(photo)
        return {licensePlate: {
            sign: plateNumber
        }, location: geoInformations}
    } catch (error) {
        console.log(error)
    }
}

export async function getCarInformations(photo: File) {
    //TODO add error handling when photo is to big
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

export async function getGeoInformations(photo: File) {
    const tags = await ExifReader.load(photo, {expanded: true})
    return tags.gps
}
