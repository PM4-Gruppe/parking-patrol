/**
 * @jest-environment jsdom
 */
import React from 'react';
import '@testing-library/jest-dom';
import { getCarInformations, getGeoInformations } from '../src/lib/photoAnalyzer';
import fs from 'fs';
import fetchMock from 'jest-fetch-mock';

global.fetch = fetchMock;

describe('photoAnalyzer', () => {
    it('gets a plateNumber from getCarInformations', async () => {
        const expected = 'AA-123-AA';
        const photoData = new File(['./storage/npp-1-2.jpg'], 'npp-1-2.jpg', { type: 'image/jpeg' });

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

    });

    it('returns undefined when the file has no GPS information', async () => {
        const file = fs.readFileSync('./storage/npp-1-2.jpg');
        const photoData = new File([file], 'npp-1-2.jpg', { type: 'image/jpeg' });

        const result = await getGeoInformations(photoData);
        expect(result).toBeUndefined();
    });
});
