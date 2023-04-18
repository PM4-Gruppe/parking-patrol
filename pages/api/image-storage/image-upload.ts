import { NextApiHandler, NextApiRequest } from 'next';
import path from 'path';
import formidable from 'formidable';
import sharp from 'sharp';
import fs from 'fs';

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

const saveFile = async (req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files; }> => {
    const options: formidable.Options = {};
    options.uploadDir = path.join(process.cwd(), '/storage');
    options.filename = (name, ext, path, form) => {
        return Date.now().toString();
    };
    options.maxFileSize = 4000 * 1024 * 1024;
    const form = formidable(options);
    return new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) reject;
            resolve({ fields, files });
        });
    });
};

const handler: NextApiHandler = async (req, res) => {
    let compressedImagePath = '';
    let thumbnailPath = '';
    let originalImagePath = '';
    try {
        const { files } = await saveFile(req);
        originalImagePath = files.image.filepath;
        compressedImagePath = await saveCompressedImage(originalImagePath, files.image.newFilename, 800, 80, false)
        thumbnailPath = await saveCompressedImage(originalImagePath, files.image.newFilename, 200, 60, true)
        res.status(200).json({ message: 'Image saved successfully.' });
    } catch (error) {
        if (fs.existsSync(compressedImagePath)) fs.unlinkSync(compressedImagePath);
        if (fs.existsSync(thumbnailPath)) fs.unlinkSync(thumbnailPath);
        if (fs.existsSync(originalImagePath)) fs.unlinkSync(originalImagePath);
        res.status(500).json({ message: 'Error saving image.' });
    }
}

export default handler;