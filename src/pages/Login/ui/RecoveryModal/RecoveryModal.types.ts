import type { Dispatch, SetStateAction } from 'react'

export type RecoveryModalProps = {
  isOpen: boolean
  onClose: () => void
  login: string
  setLogin: Dispatch<SetStateAction<string>>
  loginError: string
  setLoginError: Dispatch<SetStateAction<string>>
  validateLogin: (value: string) => string
}
