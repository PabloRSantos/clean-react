import { FormContext } from '@/presentation/contexts/form/form-context'
import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useContext,
  useRef
} from 'react'
import Styles from './input-styles.scss'

type Props = DetailedHTMLProps<
InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
>;

export const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext)
  const inputRef = useRef<HTMLInputElement>()
  const error = state[`${props.name}Error`]

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div
      data-testid={`${props.name}-wrap`}
      data-status={error ? 'invalid' : 'valid'}
      className={Styles.inputWrap}
    >
      <input
        {...props}
        ref={inputRef}
        title={error}
        placeholder=" "
        data-testid={props.name}
        onChange={handleChange}
        readOnly
        onFocus={(e) => {
          e.target.readOnly = false
        }}
      />
      <label
        data-testid={`${props.name}-label`}
        title={error}
        onClick={() => {
          inputRef.current.focus()
        }}
      >
        {props.placeholder}
      </label>
    </div>
  )
}
