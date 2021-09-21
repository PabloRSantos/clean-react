import React, { HTMLAttributes } from 'react'
import Styles from './spinner-styles.scss'

type Props = HTMLAttributes<HTMLElement> & {
  isNegative?: boolean
};

export const Spinner: React.FC<Props> = (props: Props) => {
  const negativeClass = props.isNegative ? Styles.negative : ''

  return (
    <div data-testid='spinner' {...props} className={[Styles.spinner, props.className, negativeClass].join(' ')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
