import handler from '../src/pages/api/image-storage/image-upload';
import { saveCompressedImage} from '../src/pages/api/image-storage/image-upload';
import path from 'path';
import fs from 'fs/promises';

jest.mock('@auth0/nextjs-auth0', () => ({
    withApiAuthRequired: jest.fn().mockImplementation((handler) => handler),
}));

jest.mock('fs');

describe('image-upload', () => {

    afterAll(async () => {
        try {
            const filePath = path.join(process.cwd(), '/storage', 'compressed_npp-1-2.jpg');
            await fs.unlink(filePath);
        } catch (error) {
            console.error('Error removing file:', error);
        }
    });

    it('calls handler function', async () => {
        const req = {
            method: 'POST',
            body: {},
            files: {
                image: {
                    path: 'test-image.jpg',
                    name: 'test-image.jpg',
                },
            },
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        await handler(req, res);
        expect(res.status).toHaveBeenCalled();
    });

    it('returns a 500 status code', async () => {
        const req = {
            method: 'POST',
            body: {},
            files: {
                image: {
                    path: 'test-image.jpg',
                    name: 'test-image.jpg',
                },
            },
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        await handler(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should resize the image and save it with the correct name', async () => {
        const originalImagePath = './__test__/testImages/npp-1-2.jpg';
        const originalImageName = 'npp-1-2.jpg';
        const maxWidth = 800;
        const quality = 80;
        const thumbnail = false;
        const expectedImagePath = path.join(process.cwd(), '/storage', 'compressed_npp-1-2.jpg');

        await saveCompressedImage(originalImagePath, originalImageName, maxWidth, quality, thumbnail);

        const fileStats = await fs.stat(expectedImagePath);
        const fileExists = fileStats.isFile();
        expect(fileExists).toBe(true);
    });
});