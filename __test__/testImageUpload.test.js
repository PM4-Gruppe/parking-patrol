import { saveCompressedImage, deleteImages, saveOriginalImage } from '../src/pages/api/image/upload';
import path from 'path';
import { promises as fsPromises } from 'graceful-fs';
import formidable from 'formidable';

jest.mock('@auth0/nextjs-auth0', () => ({
    withApiAuthRequired: jest.fn().mockImplementation((handler) => handler),
}));

jest.mock('formidable', () => {
    const mockParse = jest.fn().mockImplementation((req, callback) => {
        const mockFile = {
            filepath: './__test__/testImages/npp-1-2.jpg',
            newFilename: 'image.jpg',
        };
        const mockFields = {};
        const mockFiles = {
            image: mockFile,
        };
        callback(null, mockFields, mockFiles);
    });

    return jest.fn().mockImplementation(() => {
        return {
            parse: mockParse,
        };
    });
});

jest.mock('graceful-fs', () => require('fs'));

describe('image-upload', () => {

    it('should resize the image and save it with the correct name', async () => {
        const originalImagePath = './__test__/testImages/npp-1-2.jpg';
        const originalImageName = 'npp-1-2.jpg';
        const maxWidth = 800;
        const quality = 80;
        const thumbnail = false;
        const expectedImagePath = path.join(process.cwd(), '/public/storage', 'compressed_npp-1-2.jpg');

        await saveCompressedImage(originalImagePath, originalImageName, maxWidth, quality, thumbnail);

        const fileStats = await fsPromises.stat(expectedImagePath);
        const fileExists = fileStats.isFile();
        expect(fileExists).toBe(true);
        await deleteImages(expectedImagePath);
    });

    it('should delete the image', async () => {
        const originalImagePath = './__test__/testImages/npp-1-2.jpg';
        const originalImageName = 'npp-1-2.jpg';
        const maxWidth = 800;
        const quality = 80;
        const thumbnail = false;
        const expectedImagePath = path.join(process.cwd(), '/public/storage', 'compressed_npp-1-2.jpg');

        await saveCompressedImage(originalImagePath, originalImageName, maxWidth, quality, thumbnail);
        await deleteImages(expectedImagePath);

        try {
            await fsPromises.stat(expectedImagePath);
            // The file still exists, so the test should fail
            expect(true).toBe(false);
        } catch (error) {
            // The file does not exist, so the test should pass
            expect(error.code).toBe('ENOENT');
        }
    });

    it('should save the original image', async () => {
        const req = {};

        const result = await saveOriginalImage(req);
        console.log(result);

        expect(formidable).toHaveBeenCalled();
        expect(result).toEqual({
            filepath: './__test__/testImages/npp-1-2.jpg',
            newFilename: 'image.jpg',
        });
    });
});
