import { AccessDeniedError } from '@/domain/errors'
import { useLogout } from '.'

type Callback = (error: Error) => void
type Result = Callback

export const useErrorHandler = (callback: Callback): Result => {
  const logout = useLogout()

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      logout()
    } else {
      callback(error)
    }
  }
}
