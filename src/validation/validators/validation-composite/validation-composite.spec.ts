import { FieldValidationSpy } from '../test/mock-field-validation'
import { ValidationComposite } from './validation-composite'

const makeSut = (): ValidationComposite => {
  const fieldValidationSpy = new FieldValidationSpy('any_field')
  const fieldValidationSpy2 = new FieldValidationSpy('any_field')
  fieldValidationSpy2.error = new Error('any_error_message')
  return new ValidationComposite([fieldValidationSpy, fieldValidationSpy2])
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const sut = makeSut()
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('any_error_message')
  })
})
