import { useState } from 'react'
import { useSearchParams, useNavigate, Navigate } from 'react-router-dom'
import { Button, Input } from '@/components/ui'
import { ROUTES } from '@/app/router'
import { validatePassword } from '@/pages/Login/validation'
import { usePasswordReset } from './hooks/usePasswordReset'

const PasswordReset = () => {
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [touched, setTouched] = useState(false)

  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const navigate = useNavigate()

  const { send, isPending } = usePasswordReset()

  if (!token) {
    return <Navigate to={ROUTES.login} replace />
  }

  const resetPassword = () => {
    setPassword('')
    setPasswordError('')
  }

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    const passwordErr = validatePassword(password)
    if (passwordErr) {
      setPasswordError(passwordErr)
      return
    }
    try {
      await send({ token, password })
      handleReturn()
    } catch (e) {
      void e
    }
  }

  const handleReturn = () => {
    resetPassword()
    navigate(ROUTES.login, { replace: true })
  }

  const handleBlur = () => {
    setTouched(true)
  }

  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <div className="min-w-[651px]">
        <header className={`flex items-center justify-between pl-[24px] pr-[15px] py-[12px]`}>
          <h3 className="m-0 text-h3 text-text">Задать новый пароль</h3>
        </header>

        <div className="flex-1 overflow-y-auto px-[24px] py-[19px] text-text">
          <form id="recovery" onSubmit={handleSubmit}>
            <p className="text-text-grey-dark text-xs mb-1">Пароль</p>
            <Input
              value={password}
              onChange={e => {
                setPassword(e.target.value)
                setPasswordError(validatePassword(e.target.value))
              }}
              onBlur={handleBlur}
              placeholder="Пароль"
              className={`min-h-[46px] ${passwordError && touched ? 'border-red-dark focus:ring-red-dark' : ''}`}
            />
            <div className="min-h-[19px] text-xs">
              <p
                className={`
                  ${passwordError && touched ? 'text-red-dark opacity-100' : 'opacity-0'} transition-opacity
                `}
              >
                {passwordError}
              </p>
            </div>

            <div className={`flex items-center justify-end gap-3 mt-[39px]`}>
              <div className="flex justify-between w-full">
                <Button type="button" label="Отмена" variant="secondary" onClick={handleReturn} size="normal" />
                <Button
                  type="submit"
                  label="Отправить"
                  disabled={!!passwordError || !password || isPending}
                  size="normal"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export const Component = PasswordReset
