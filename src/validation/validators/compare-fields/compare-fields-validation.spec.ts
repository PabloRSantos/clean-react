import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (valueToCompare: string): CompareFieldsValidation => {
  return new CompareFieldsValidation(faker.database.column(), valueToCompare)
}

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const sut = makeSut(faker.random.word())

    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })
})