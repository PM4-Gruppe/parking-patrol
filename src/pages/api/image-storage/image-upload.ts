import { NextApiHandler, NextApiRequest } from 'next';
import path from 'path';
import formidable from 'formidable';
import sharp from 'sharp';
import fs from 'fs';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

export const config = {
    api: {
        bodyParser:
            false,
    }
}

const saveCompressedImage = async (
    originalImagePath: string,
    originalImageName: string,
    maxWidth: number,
    quality: number,
    thumbnail: boolean,
): Promise<string> => {
    const imageName = `${thumbnail ? 'thumbnail' : 'compressed'}` + '_' + originalImageName;
    const imagePath = path.join(process.cwd(), '/storage', imageName)
    await sharp(originalImagePath)
        .resize(maxWidth)
        .jpeg({ quality })
        .toFile(imagePath);
    return imagePath;
}

const saveOriginalImage = async (req: NextApiRequest): Promise<formidable.File> => {
    const options: formidable.Options = {};
    options.uploadDir = path.join(process.cwd(), '/storage');
    options.keepExtensions = true;
    options.filename = (name, ext, path, form) => {
        return Date.now().toString() + ext;
    };
    options.maxFileSize = 10 * 1024 * 1024; //10 mb
    const form = formidable(options);
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            const image: formidable.File = files['image'] as formidable.File;
            resolve(image);
        });
    });
};

const handler: NextApiHandler = async (req, res) => {
    let compressedImagePath = '';
    let thumbnailPath = '';
    let originalImagePath = '';
    try {
        const image = await saveOriginalImage(req);
        originalImagePath = image.filepath;
        compressedImagePath = await saveCompressedImage(originalImagePath, image.newFilename, 800, 80, false)
        thumbnailPath = await saveCompressedImage(originalImagePath, image.newFilename, 200, 60, true)
        res.status(200).json({
            message: 'Image saved successfully.',
            'original image path': originalImagePath,
            'compressed image path': compressedImagePath,
            'thumbnail path': thumbnailPath
        });
    } catch (error) {
        if (fs.existsSync(compressedImagePath)) fs.unlinkSync(compressedImagePath);
        if (fs.existsSync(thumbnailPath)) fs.unlinkSync(thumbnailPath);
        if (fs.existsSync(originalImagePath)) fs.unlinkSync(originalImagePath);
        res.status(500).json({ message: 'Error saving image: ' + error });
    }
}

export default withApiAuthRequired(handler);