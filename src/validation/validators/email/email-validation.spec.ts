import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'
import { EmailValidation } from '@/validation/validators'

const makeSut = (field: string): EmailValidation => {
  return new EmailValidation(field)
}

describe('EmailValidation', () => {
  test('Should return error if email is invalid ', () => {
    const field = faker.database.column()
    const sut = makeSut(field)

    const error = sut.validate({ [field]: faker.random.words() })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if email is valid ', () => {
    const field = faker.database.column()
    const sut = makeSut(field)

    const error = sut.validate({ [field]: faker.internet.email() })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if email is empty ', () => {
    const field = faker.database.column()
    const sut = makeSut(field)

    const error = sut.validate({ [field]: '' })
    expect(error).toBeFalsy()
  })
})
