import { AlprStatistic } from './AlprStatistic'
import { LicensePlate } from './LicensePlate'
export interface PhotoInformation {
  alprStats: AlprStatistic
  location?: ExifReader.GpsTags
}

export interface SavedImageDetails {
  compressedImagePath: string
  message: string
  originalImagePath: string
  thumbnailPath: string
}
