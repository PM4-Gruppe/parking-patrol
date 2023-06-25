import { PutObjectCommand, GetObjectCommand, S3 } from '@aws-sdk/client-s3'

const s3Client = new S3({
  endpoint: 'https://fra1.digitaloceanspaces.com', // Find your endpoint in the control panel, under Settings. Prepend "https://".
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  region: 'us-east-1', // Must be "us-east-1" when creating new Spaces.
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
    const response = await s3Client.send(new GetObjectCommand(bucket(filename)))
    const byteArray = await response.Body?.transformToByteArray()
    if (!byteArray) return

    return Buffer.from(byteArray)
  } catch (err) {
    console.log('Error', err)
  }
}
