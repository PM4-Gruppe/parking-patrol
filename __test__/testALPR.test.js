import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import handler from '../src/pages/api/image/alpr';

jest.mock('@auth0/nextjs-auth0', () => ({
    withApiAuthRequired: jest.fn().mockImplementation((handler) => handler),
}));

jest.mock('../src/pages/api/image/upload', () => ({
    saveOriginalImage: jest.fn().mockImplementation(() => ({
        filepath: './__test__/testImages/npp-1-2.jpg',
    })),
    saveCompressedImage: jest.fn().mockImplementation(() => ({
        filepath: './__test__/testImages/npp-1-2.jpg',
    })),
    deleteImages: jest.fn().mockImplementation(() => ({
        filepath: './__test__/testImages/npp-1-2.jpg',
    })),
}));

jest.mock('node-fetch');
global.fetch = fetchMock;
global.URL.createObjectURL = jest.fn();

describe('ALPR Handler', () => {
    it('should return the expected plate number', async () => {
        const expected = 'AA-123-AA';

        const mockedResponse = {
            json: async () => ({
                results: [
                    {
                        plate: {
                            number: expected,
                        },
                    },
                ],
            }),
        };

        global.fetch = jest.fn().mockResolvedValue(mockedResponse);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await handler(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ results: [{ plate: { number: expected } }] });
    });
});
