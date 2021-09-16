import { HttpPostClient, HttpResponse, HttpStatusCode, HttpPostParams, HttpGetClient, HttpGetParams } from '@/data/protocols/http'
import faker from 'faker'

export class HttpPostClientSpy<R = any> implements HttpPostClient<R> {
  url?: string
  body?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body

    return Promise.resolve(this.response)
  }
}

export class HttpGetClientSpy<R = any> implements HttpGetClient<R> {
  url?: string
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async get (params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url

    return Promise.resolve(this.response)
  }
}

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})
