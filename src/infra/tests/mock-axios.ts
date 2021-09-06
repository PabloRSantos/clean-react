import axios, { AxiosStatic } from 'axios'
import faker from 'faker'

export const mockAxios = (): jest.Mocked<AxiosStatic> => {
  const mockedAxios = axios as jest.Mocked<AxiosStatic>

  mockedAxios.post.mockResolvedValue({
    data: faker.random.objectElement(),
    status: faker.datatype.number()
  })

  return mockedAxios
}
