import { uploadImage, downloadImage } from '../src/lib/imageProvider';
import { S3 } from '@aws-sdk/client-s3';

jest.mock('@aws-sdk/client-s3');

describe('uploadImage', () => {
    it('should call the uploadImage function', async () => {
        const mockSend = jest.fn().mockResolvedValue({}); // Mock the S3 send function
        S3.prototype.send = mockSend;

        const filename = 'example.jpg';
        const image = Buffer.from('image content');

        await uploadImage(filename, image);

        expect(mockSend).toHaveBeenCalledTimes(1);
    });
});

describe('downloadImage', () => {
    it('should call the downloadImage function', async () => {
        const mockSend = jest.fn().mockResolvedValue({ Body: Buffer.from('image content') }); // Mock the S3 send function
        S3.prototype.send = mockSend;

        const filename = 'example.jpg';

        await downloadImage(filename);

        expect(mockSend).toHaveBeenCalledTimes(1);
    });
});
