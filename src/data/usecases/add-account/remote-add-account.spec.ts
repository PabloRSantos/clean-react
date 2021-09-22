import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy } from '@/data/test'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { mockAddAccountModel, mockAddAccountParams } from '@/domain/test'
import faker from 'faker'
import { RemoteAddAccount } from './remote-add-account'

type SutTypes = {
  sut: RemoteAddAccount
  httpClientSpy: HttpClientSpy<RemoteAddAccount.Model>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAddAccount.Model>()
  const sut = new RemoteAddAccount(url, httpClientSpy)

  return { sut, httpClientSpy }
}

describe('RemoteAddAccount', () => {
  test('Should call HttpClient with correct URL and Method', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)

    await sut.add(mockAddAccountParams())

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
  })

  test('Should call HttpClient with correct body', async () => {
    const { sut, httpClientSpy } = makeSut()

    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)

    expect(httpClientSpy.body).toEqual(addAccountParams)
  })

  test('Should throws EmailInUseError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    const promise = sut.add(mockAddAccountParams())

    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  test('Should throws UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }

    const promise = sut.add(mockAddAccountParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throws UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.add(mockAddAccountParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throws UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.add(mockAddAccountParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an account model if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()

    const httpResult = mockAddAccountModel()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const account = await sut.add(mockAddAccountParams())

    expect(account).toEqual(httpResult)
  })
})
