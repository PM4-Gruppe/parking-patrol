import { NextApiHandler, NextApiRequest } from 'next'
import path from 'path'
import formidable from 'formidable'
import sharp from 'sharp'
import fs from 'fs'
import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { SavedImageDetails } from '../../../schemas/PhotoInformation'

export const config = {
  api: {
    bodyParser: false,
  },
}

export const saveCompressedImage = async (
  originalImagePath: string,
  originalImageName: string,
  maxWidth: number,
  quality: number,
  thumbnail: boolean
): Promise<{ filename: string; filepath: string }> => {
  const imageName =
    `${thumbnail ? 'thumbnail' : 'compressed'}` + '_' + originalImageName
  const imagePath = path.join(process.cwd(), '/public/storage', imageName)
  await sharp(originalImagePath)
    .resize(maxWidth)
    .jpeg({ quality })
    .toFile(imagePath)
  return { filename: imageName, filepath: imagePath }
}

export const deleteImages = (...imagePaths: string[]) => {
  for (const imagePath of imagePaths) {
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath)
    }
  }
}

export const saveOriginalImage = async (
  req: NextApiRequest
): Promise<formidable.File> => {
  const options: formidable.Options = {}
  options.uploadDir = path.join(process.cwd(), '/public/storage')
  options.keepExtensions = true
  options.filename = (name, ext, path, form) => {
    return Date.now().toString() + ext
  }
  options.maxFileSize = 10 * 1024 * 1024 //10 mb
  const form = formidable(options)
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err)
      }

      const image: formidable.File = files['image'] as formidable.File
      resolve(image)
    })
  })
}

const handler: NextApiHandler = async (req, res) => {
  let compressedImagePath
  const image = await saveOriginalImage(req)
  const originalImagePath = image.filepath
  compressedImagePath = await saveCompressedImage(
    originalImagePath,
    image.newFilename,
    800,
    80,
    false
  )
  try {
    const thumbnailPath = await saveCompressedImage(
      originalImagePath,
      image.newFilename,
      200,
      60,
      true
    )
    res.status(200).json({
      message: 'Image saved successfully.',
      originalImagePath: image.newFilename,
      compressedImagePath: compressedImagePath.filename,
      thumbnailPath: thumbnailPath.filename,
    } as SavedImageDetails)
  } catch (error) {
    deleteImages(compressedImagePath.filepath, originalImagePath)
    res.status(500).json({ message: 'Error saving image: ' + error })
  }
}

export default withApiAuthRequired(handler)
