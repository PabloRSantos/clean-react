import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ApiContext } from '../contexts'

type Result = () => void

export const useLogout = (): Result => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)

  return (): void => {
    setCurrentAccount(undefined)
    history.replace('/login')
  }
}
