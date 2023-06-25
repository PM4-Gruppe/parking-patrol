import { PutObjectCommand, GetObjectCommand, S3 } from '@aws-sdk/client-s3'
import { SdkStream } from '@aws-sdk/types'
import { writeFileSync } from 'fs'
import { Blob } from 'buffer'

const s3Client = new S3({
  endpoint: 'https://fra1.digitaloceanspaces.com', // Find your endpoint in the control panel, under Settings. Prepend "https://".
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  region: 'us-east-1', // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
  credentials: {
    accessKeyId: process.env.SPACES_KEY as string,
    secretAccessKey: process.env.SPACES_SECRET as string,
  },
})

const bucket = (filename: string, image?: Buffer) => {
  if (image) {
    return {
      Bucket: 'parking-patrol',
      Key: filename,
      Body: image,
    }
  } else
    return {
      Bucket: 'parking-patrol',
      Key: filename,
    }
}

// Function to turn the file's body into a string.
const streamToString = (stream: ReadableStream<any> | any) => {
  if (!stream) return
  const chunks: any[] = []

  return new Promise((resolve, reject) => {
    stream.on('data', (chunk: any) => chunks.push(Buffer.from(chunk)))
    stream.on('error', (err: any) => reject(err))
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

export const uploadImage = async (filename: string, image: Buffer) => {
  try {
    const data = await s3Client.send(
      new PutObjectCommand(bucket(filename, image))
    )
    return data
  } catch (err) {
    console.log('Error', err)
  }
}

export const downloadImage = async (filename: string) => {
  try {
    const filepath = `/tmp/${filename}`
    const response = await s3Client.send(new GetObjectCommand(bucket(filename)))
    const byteArray = await response.Body?.transformToByteArray()
    if (!byteArray) return
    let buffer = Buffer.from(byteArray)
    let arraybuffer = Uint8Array.from(buffer).buffer
    //const data = await streamToString(response.Body?.readableBuffer)
    //writeFileSync(filepath, data as string)
    //const uint8Array = new Uint8Array(byteArray)
    let blob
    if (byteArray) blob = new Blob([byteArray], { type: 'image/jpeg' })

    return buffer
  } catch (err) {
    console.log('Error', err)
  }
}
