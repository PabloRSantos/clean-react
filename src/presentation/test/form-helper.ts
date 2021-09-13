import {
  screen
} from '@testing-library/react'

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
