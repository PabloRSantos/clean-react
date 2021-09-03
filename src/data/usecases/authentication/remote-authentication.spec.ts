import { HttpPostClient } from '../../protocols/http/http-post-client'
import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClient
}

const makeSut = (): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
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
