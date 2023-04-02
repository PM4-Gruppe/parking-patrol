import fs from 'fs'
import path from 'path'

export const saveImage = async (image: File): Promise<void> => {
  const filePath = path.join('/storage', File.name)
  const buffer = await image.arrayBuffer()
  fs.writeFileSync(filePath, Buffer.from(buffer))
}

export default saveImage;
