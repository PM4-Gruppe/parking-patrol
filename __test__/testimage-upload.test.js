import { saveCompressedImage} from '../src/pages/api/image/upload';
import path from 'path';
import fs from 'fs/promises';

jest.mock('@auth0/nextjs-auth0', () => ({
    withApiAuthRequired: jest.fn().mockImplementation((handler) => handler),
}));

jest.mock('fs');

describe('image-upload', () => {

    afterAll(async () => {
        try {
            const filePath = path.join(process.cwd(), '/public/storage', 'compressed_npp-1-2.jpg');
            await fs.unlink(filePath);
        } catch (error) {
            console.error('Error removing file:', error);
        }
    });

    it('should resize the image and save it with the correct name', async () => {
        const originalImagePath = './__test__/testImages/npp-1-2.jpg';
        const originalImageName = 'npp-1-2.jpg';
        const maxWidth = 800;
        const quality = 80;
        const thumbnail = false;
        const expectedImagePath = path.join(process.cwd(), '/public/storage', 'compressed_npp-1-2.jpg');

        await saveCompressedImage(originalImagePath, originalImageName, maxWidth, quality, thumbnail);

        const fileStats = await fs.stat(expectedImagePath);
        const fileExists = fileStats.isFile();
        expect(fileExists).toBe(true);
    });
});