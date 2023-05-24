import { PhotoInformation } from '../schemas/PhotoInformation'
import ExifReader from 'exifreader';
import { LocalEndpoint } from './ApiEndpoints/LocalEndpoint';

export async function getPhotoInformations(photo: File): Promise<PhotoInformation | undefined> {
  const api = new LocalEndpoint()
  try {
    const geoInformations = await getGeoInformations(photo)
    const alprStats = await api.readAlprStats(photo)
    
    if(!alprStats) return
    return {alprStats, location: geoInformations}
  } catch (error) {
      console.log(error)
  }
}

export async function getGeoInformations(photo: File) {
  const tags = await ExifReader.load(photo, {expanded: true})
  return tags.gps
}
