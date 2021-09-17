import faker from 'faker'
import { mockAccountModel } from '.'
import { Authentication } from '../usecases'

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationModel = (): Authentication.Model => mockAccountModel()
