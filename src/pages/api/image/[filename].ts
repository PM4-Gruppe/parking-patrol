import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import { downloadImage } from '../../../lib/imageProvider'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const stream = await downloadImage(req.query.filename as string)

  try {
    //const fileBuffer = await fs.promises.readFile({ path: filePath })

    res.setHeader('Content-Type', 'image/jpeg')
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${req.query.filename}`
    )
    res.status(200).send(stream)
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}
