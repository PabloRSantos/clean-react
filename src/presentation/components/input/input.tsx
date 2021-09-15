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
    <div className={Styles.inputWrap}>
      <input
        {...props}
        ref={inputRef}
        placeholder=" "
        data-testid={props.name}
        onChange={handleChange}
        readOnly
        onFocus={e => { e.target.readOnly = false }}
      />
      <label onClick={() => { inputRef.current.focus() }}>{props.placeholder}</label>
      <span
        data-testid={`${props.name}-status`}
        title={error || 'Tudo certo!'}
        className={Styles.status}
      >
        {error ? '🔴' : '🟢'}
      </span>
    </div>
  )
}
