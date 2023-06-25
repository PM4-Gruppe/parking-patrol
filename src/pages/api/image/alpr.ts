/**
 * ALPR stands for Automatic License Plate Recognition
 */
import fs from 'fs'
import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { saveOriginalImage, saveCompressedImage, deleteImages } from './upload'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import FormData from 'form-data'
import { AlprStatistic } from '../../../schemas/AlprStatistic'

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler: NextApiHandler = async (req, res) => {
  let alprStat
  let image = await saveOriginalImage(req)
  const compressedImagePath = await saveCompressedImage(
    image.filepath,
    image.newFilename,
    800,
    80,
    false
  )

  const body = new FormData()
  body.append('regions', 'ch') // Change to your country
  body.append('upload', fs.createReadStream(compressedImagePath.filepath))

  try {
    console.log('SERVER LOG: ', `Token ${process.env.PR_TOKEN as string}`)
    const alprResponse = await fetch(
      'https://api.platerecognizer.com/v1/plate-reader/',
      {
        method: 'POST',
        headers: {
          Authorization: `Token ${process.env.PR_TOKEN as string}`,
        },
        body: body as any,
      }
    )
    alprStat = (await alprResponse.json()) as AlprStatistic
  } catch (error) {
    console.log(error)
  }
  deleteImages(image.filepath, compressedImagePath.filepath)

  return res.status(200).json(alprStat)
}

export default withApiAuthRequired(handler)
