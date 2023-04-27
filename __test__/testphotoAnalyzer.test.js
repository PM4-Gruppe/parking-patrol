/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getPhotoInformations } from '../src/lib/photoAnalyzer';
import fs from 'fs';
import fetchMock from 'jest-fetch-mock';

global.fetch = fetchMock;

describe('photoAnalyzer', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('gets a plateNumber from getCarInformations', async () => {
        const expectedPhotoInfo = {
            licensePlate: {
                sign: 'SG122',
            },
        };
        const mockFetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve({ results: [{ plate: expectedPhotoInfo.licensePlate.sign }]
                }),
            })
        );
        global.fetch = mockFetch;

        const photoData = fs.readFileSync('./storage/npp-1-2.jpg');
        const photoFile = new File([photoData], 'npp-1-2.jpeg', { type: 'image/*' });
        const photoInfo = await getPhotoInformations(photoFile);

        expect(photoInfo.licensePlate?.sign).toEqual(expectedPhotoInfo.licensePlate?.sign);
        expect(mockFetch).toHaveBeenCalled();
    });

    it('gets the geoLocation from getGeoInformations', () => {

    });
});