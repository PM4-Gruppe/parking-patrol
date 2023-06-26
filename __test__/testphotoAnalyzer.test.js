/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import {getGeoInformations, getPhotoInformations} from '../src/lib/photoAnalyzer';
import fs from 'fs';
import fetchMock from 'jest-fetch-mock';

global.fetch = fetchMock;
const PHOTO_FILE_WITH_GPS = './__test__/testImages/npp-1-1.jpg';
const PHOTO_FILE_WITHOUT_GPS = './__test__/testImages/npp-1-2.jpg';


describe('photoAnalyzer', () => {
    it('gets the geoLocation from getGeoInformations', async () => {
        const expected = {
            Altitude: 425.6578185328185,
            Latitude: 47.41546944444444,
            Longitude: 8.55948888888889,
        };
        const photoFile = fs.readFileSync(PHOTO_FILE_WITH_GPS);
        const photoData = new File([photoFile], 'npp-1-1.jpg', { type: 'image/jpeg' });

        const result = await getGeoInformations(photoData);
        expect(result).toEqual(expected);
    });

    it('returns undefined when the file has no GPS information', async () => {
        const file = fs.readFileSync(PHOTO_FILE_WITHOUT_GPS);
        const photoData = new File([file], 'npp-1-2.jpg', { type: 'image/jpeg' });

        const result = await getGeoInformations(photoData);
        expect(result).toBeUndefined();
    });

    it('get from getPhotoInformations the plate-number and geolocation', async () => {
        const expectedGeoLocation = {
            Altitude: 425.6578185328185,
            Latitude: 47.41546944444444,
            Longitude: 8.55948888888889,
        };

        const expectedPlateNumber = [{'plate': 'AA-123-AA'}];
        const photoFile = fs.readFileSync(PHOTO_FILE_WITH_GPS);
        const photoData = new File([photoFile], 'npp-1-1.jpg', { type: 'image/jpeg' });

        // Mocked response from fetch
        const mockedResponse = {
            json: async () => ({
                results: expectedPlateNumber,
            }),
        };

        // Mock the fetch function
        global.fetch = jest.fn().mockResolvedValue(mockedResponse);

        const result = await getPhotoInformations(photoData);

        expect(result.alprStats.results).toEqual(expectedPlateNumber);
        expect(result.location).toEqual(expectedGeoLocation);
    })
});
