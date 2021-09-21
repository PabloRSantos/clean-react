import React from 'react'
import Styles from './error-styles.scss'

type Props = {
  error: string
  reload: () => void
}

export const Error: React.FC<Props> = ({ error, reload }) => {
  return (
    <div data-testid="error" className={Styles.errorWrap}>
      <span>{error}</span>
      <button data-testid="reload" onClick={reload}>Recarregar</button>
    </div>
  )
}
