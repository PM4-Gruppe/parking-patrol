export class LocalEndpoint {
  url = '/api'

  async getRequest(path: string) {
    return await fetch(this.url + path).then(res => res.json())
  }

  async postRequest(path: string, body: FormData) {
    return await fetch(this.url + path, { method: 'POST', body: body }).then(res => res.json())
  }
}