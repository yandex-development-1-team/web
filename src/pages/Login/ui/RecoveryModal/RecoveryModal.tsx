import { useState } from 'react'
import { Button, Input, Modal } from '@/components/ui'
import type { RecoveryModalProps } from './RecoveryModal.types'

export const RecoveryModal = ({ isOpen, onClose, validateLogin }: RecoveryModalProps) => {
  const [login, setLogin] = useState('')
  const [loginError, setLoginError] = useState('')
  const [touched, setTouched] = useState(false)

  const resetLogin = () => {
    setLogin('')
    setLoginError('')
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    const loginErr = validateLogin(login)
    if (loginErr) {
      setLoginError(loginErr)
      return
    }
    handleClose()
  }

  const handleClose = () => {
    resetLogin()
    onClose()
  }

  const handleBlur = () => {
    setTouched(true)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Восстановить пароль"
      footer={
        <div className="flex justify-between w-full">
          <Button type="button" label="Отмена" variant="secondary" onClick={handleClose} size="normal" />
          <Button type="submit" label="Отправить" disabled={!!loginError || !login} size="normal" form="recovery" />
        </div>
      }
      showBorders={true}
    >
      <form id="recovery" onSubmit={handleSubmit}>
        <p className="text-text-grey-dark text-xs mb-1">Логин</p>
        <Input
          value={login}
          onChange={e => {
            setLogin(e.target.value)
            setLoginError(validateLogin(e.target.value))
          }}
          onBlur={handleBlur}
          placeholder="Логин"
          className={`min-h-[46px] ${loginError && touched ? 'border-red-dark focus:ring-red-dark' : ''}`}
        />
        <div className="min-h-[18px] text-xs">
          <p className={`${loginError && touched ? 'text-red-dark opacity-100' : 'opacity-0'} transition-opacity`}>
            {loginError}
          </p>
        </div>
      </form>
    </Modal>
  )
}
