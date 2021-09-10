import { FormContext } from '@/presentation/contexts/form/form-context'
import React, { useContext } from 'react'
import { Spinner } from '../spinner/spinner'
import Styles from './form-status-styles.scss'

export const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(FormContext)

  return (
    <div className={Styles.errorWrap} data-testid='error-wrap'>
      {state.isLoading && <Spinner className={Styles.spinner}/>}
      {errorState.main && <span className={Styles.error}>{errorState.main}</span>}
    </div>
  )
}
