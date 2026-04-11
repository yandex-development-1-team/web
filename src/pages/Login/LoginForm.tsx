import { useState } from 'react'
import { Button, Input } from '@/components/ui'
import { EyeIcon, EyeCloseIcon } from '@/assets/icons'
import { useModal } from '@/components/ui/Modal/useModal'
import { RecoveryModal } from './ui/RecoveryModal'
import { Navigate, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/app/router'
import { useLogin } from './hooks/useLogin'
import { validateLogin, validatePassword } from './validation'
import { tokenStorage } from '@/app/providers/axios/lib/tokenStorageInstance'
import type { AxiosError } from 'axios'

export const LoginForm = () => {
  const [authFormData, setAuthFormData] = useState({
    login: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')

  const navigate = useNavigate()

  const { mutateAsync, isPending } = useLogin()
  const { isOpen: isOpenRecoveryModal, open: openRecoveryModal, close: closeRecoveryModal } = useModal()

  const token = tokenStorage.getToken()

  if (token) {
    return <Navigate to={ROUTES.home} replace />
  }

  const loginError = validateLogin(authFormData.login)
  const passwordError = validatePassword(authFormData.password)
  const isValid = !loginError && !passwordError

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAuthFormData(prev => ({ ...prev, [name]: value }))
    setServerError('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const user = await mutateAsync(authFormData)

      if (user.role === 'admin') {
        navigate(ROUTES.stats)
      } else if (user.role === 'manager') {
        navigate(ROUTES.home)
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      const message = axiosError.response?.data?.message || 'Неверный логин или пароль'
      setServerError(message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            name="login"
            value={authFormData.login}
            onChange={handleChange}
            placeholder="Логин"
            className={`min-h-[46px] ${loginError ? 'border-red-dark focus:ring-red-dark' : ''}`}
          />
          <div className="min-h-[18px] text-xs">
            <p className={`${loginError ? 'text-text-red-dark opacity-100' : 'opacity-0'} transition-opacity`}>
              {loginError}
            </p>
          </div>
        </div>

        <div className="relative">
          <Input
            name="password"
            value={authFormData.password}
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            placeholder="Введите пароль"
            className={`min-h-[46px] ${passwordError ? 'border-red-dark' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
          </button>
        </div>

        <div className="text-xs min-h-[18px]">
          <p className={`${passwordError ? 'text-text-red-dark opacity-100' : 'opacity-0'} transition-opacity`}>
            {passwordError}
          </p>
        </div>

        {serverError && <div className="text-xs text-text-red-dark mb-2">{serverError}</div>}

        <button
          type="button"
          className="text-text-grey-dark text-xs mb-6 inline-block cursor-pointer outline-0"
          onClick={openRecoveryModal}
        >
          Забыли пароль?
        </button>

        <Button
          type="submit"
          disabled={!isValid || isPending}
          className="w-full min-h-[46px] bg-yellow-accent-light text-text text-button font-semibold rounded-[12px] py-[12px]"
        >
          Войти
        </Button>
      </form>

      <RecoveryModal isOpen={isOpenRecoveryModal} onClose={closeRecoveryModal} validateLogin={validateLogin} />
    </>
  )
}
