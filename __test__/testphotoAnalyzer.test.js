/**
 * @jest-environment jsdom
 */
import React from 'react';
import '@testing-library/jest-dom';
import { getCarInformations, getGeoInformations } from '../src/lib/photoAnalyzer';
import fs from 'fs';
import fetchMock from 'jest-fetch-mock';

global.fetch = fetchMock;
const PHOTO_FILE_WITH_GPS = './__test__/testImages/npp-1-1.jpg';
const PHOTO_FILE_WITHOUT_GPS = './__test__/testImages/npp-1-2.jpg';

describe('photoAnalyzer', () => {
    it('gets a plateNumber from getCarInformations', async () => {
        const expected = 'AA-123-AA';
        const photoData = new File([PHOTO_FILE_WITH_GPS], 'npp-1-1.jpg', { type: 'image/jpeg' });

        // Mocked response from fetch
        const mockedResponse = {
            json: async () => ({
                results: [{ plate: expected }]
            }),
        };

        // Mock the fetch function
        global.fetch = jest.fn().mockResolvedValue(mockedResponse);

        const result = await getCarInformations(photoData);

        expect(result).toEqual(expected);
    });

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
});
