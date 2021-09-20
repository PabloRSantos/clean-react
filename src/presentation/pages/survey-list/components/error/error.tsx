import React, { useContext } from 'react'
import { SurveyContext } from '..'
import Styles from './error-styles.scss'

export const Error: React.FC = () => {
  const { state, setState } = useContext(SurveyContext)

  const reload = (): void => {
    setState({ surveys: [], error: '', reload: !state.reload })
  }

  return (
    <div data-testid="error" className={Styles.errorWrap}>
      <span>{state.error}</span>
      <button data-testid="reload" onClick={reload}>Recarregar</button>
    </div>
  )
}
