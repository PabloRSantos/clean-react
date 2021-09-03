import { HttpPostClient } from '../../protocols/http/http-post-client'
import { RemoteAuthentication } from './remote-authentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClient
}

const makeHttpClient = (): HttpPostClient => {
  class HttpPostClientSpy implements HttpPostClient {
    url?: string

    async post (url: string): Promise<void> {
      this.url = url

      return Promise.resolve()
    }
  }

  return new HttpPostClientSpy()
}

const makeSut = (): SutTypes => {
  const httpPostClientSpy = makeHttpClient()
  const sut = new RemoteAuthentication('any_url', httpPostClientSpy)

  return { sut, httpPostClientSpy }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct URL', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const postSpy = jest.spyOn(httpPostClientSpy, 'post')

    await sut.auth()
    expect(postSpy).toHaveBeenCalledWith('any_url')
  })
})
