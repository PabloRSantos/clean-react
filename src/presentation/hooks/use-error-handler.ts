import { AccessDeniedError } from '@/domain/errors'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ApiContext } from '../contexts'

type Callback = (error: Error) => void
type Result = Callback

export const useErrorHandler = (callback: Callback): Result => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined)
      history.replace('/login')
    } else {
      callback(error)
    }
  }
}
