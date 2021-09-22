import { AxiosHttpClient } from './axios-http-client'
import { mockAxios, mockHttpResponse } from '@/infra/tests'
import { AxiosStatic } from 'axios'
import { mockHttpRequest } from '@/data/test'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<AxiosStatic>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return { sut, mockedAxios }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockHttpRequest()
    const { sut, mockedAxios } = makeSut()
    await sut.request(request)

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      headers: request.headers,
      method: request.method
    })
  })

  test('Should return the correct response', async () => {
    const { sut, mockedAxios } = makeSut()
    const httpResponse = await sut.request(mockHttpRequest())

    const axiosResponse = await mockedAxios.request.mock.results[0].value

    expect(httpResponse).toEqual({
      body: axiosResponse.data,
      statusCode: axiosResponse.status
    })
  })

  test('Should return correct error', () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse()
    })
    const promise = sut.request(mockHttpRequest())

    expect(promise).toEqual(mockedAxios.request.mock.results[0].value)
  })
})
