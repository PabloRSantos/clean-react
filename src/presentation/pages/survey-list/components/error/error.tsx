import React, { useContext } from 'react'
import { SurveyContext } from '..'
import Styles from './error-styles.scss'

export const Error: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <div className={Styles.errorWrap}>
      <span>{state.error}</span>
      <button>Recarregar</button>
    </div>
  )
}
