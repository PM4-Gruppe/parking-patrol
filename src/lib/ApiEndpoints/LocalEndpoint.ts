export class LocalEndpoint {
  url = '/api'

  async getRequest(path: string) {
    try {
      return await fetch(this.url + path).then((res) => res.json())
    } catch (err) {
      console.error(err)
      return false
    }
  }

  async postRequest(path: string, body: FormData) {
    try {
      const res = await fetch(this.url + path, { method: 'POST', body: body })
      if (res.status >= 200 && res.status < 300) return res.json()
    } catch (err) {
      console.error(err)
      return false
    }
  }
}
