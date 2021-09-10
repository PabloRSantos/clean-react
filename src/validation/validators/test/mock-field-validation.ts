import { FieldValidation } from '@/validation/protocols'

export class FieldValidationSpy implements FieldValidation {
  constructor (readonly field: string) {}
  error: Error = null
  validate (value: string): Error {
    return this.error
  }
}
