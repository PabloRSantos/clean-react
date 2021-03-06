import axios, { AxiosStatic } from 'axios'
import faker from 'faker'

export const mockHttpResponse = (): any => ({
  data: faker.random.objectElement(),
  status: faker.datatype.number()
})

export const mockAxios = (): jest.Mocked<AxiosStatic> => {
  const mockedAxios = axios as jest.Mocked<AxiosStatic>

  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse())
  return mockedAxios
}
