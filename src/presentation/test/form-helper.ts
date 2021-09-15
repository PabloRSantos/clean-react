import {
  fireEvent,
  screen
} from '@testing-library/react'
import faker from 'faker'

export const testChildCount = (field: string, count: number): void => {
  const el = screen.getByTestId('error-wrap')
  expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  buttonText: string,
  isDisabled: boolean
): void => {
  const button = screen.getByRole('button', {
    name: buttonText
  }) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const testStatusForField = (
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const populateField = (field: string, value = faker.random.word()): void => {
  const input = screen.getByTestId(field)
  fireEvent.input(input, { target: { value } })
}
