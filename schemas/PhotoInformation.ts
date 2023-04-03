import { LicensePlate } from './LicensePlate';

export interface PhotoInformation {
    licensePlate: LicensePlate,
    location?: ExifReader.GpsTags
}