import { ParkedCar } from '@prisma/client'
import { AlprStatistic } from '../../schemas/AlprStatistic'
import { SavedImageDetails } from '../../schemas/PhotoInformation'

export class LocalEndpoint {
  url = '/api'

  async #getRequest(path: string): Promise<Object> {
    try {
      return await fetch(this.url + path).then((res) => res.json())
    } catch (err) {
      console.error(err)
      return false
    }
  }

  async #postRequest<T>(path: string, body: FormData): Promise<T | undefined> {
    try {
      const res = await fetch(this.url + path, {
        method: 'POST',
        body: body,
      }).then((res) => res.json())
      return res
    } catch (err) {
      return undefined
    }
  }

  async readAlprStats(parkedCar: File) {
    const body = new FormData()
    body.append('image', parkedCar)
    const res = await this.#postRequest<AlprStatistic>('/image/alpr', body)
    res?.results.forEach((res) => res.plate.toUpperCase())
    return res
  }

  async createImage(image: File) {
    const body = new FormData()
    body.append('image', image)
    return await this.#postRequest<SavedImageDetails>('/image/upload', body)
  }
}
