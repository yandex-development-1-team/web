import { useState } from 'react'
import { Button, Input } from '@/components/ui'
import { EyeIcon, EyeCloseIcon } from '@/assets/icons'
import { useModal } from '@/components/ui/Modal/useModal'
import { RecoveryModal } from './ui/RecoveryModal'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/app/router'
import { useLogin } from '../../hooks/useLogin'
import { validateLogin, validatePassword } from './validation'
import type { AxiosError } from 'axios'

export const LoginForm = () => {
  const [authFormData, setAuthFormData] = useState({
    login: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')
  const [touched, setTouched] = useState({ login: false, password: false })

  const navigate = useNavigate()

  const { mutateAsync, isPending } = useLogin()
  const { isOpen: isOpenRecoveryModal, open: openRecoveryModal, close: closeRecoveryModal } = useModal()

  const loginError = validateLogin(authFormData.login)
  const passwordError = validatePassword(authFormData.password)
  const isValid = !loginError && !passwordError

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAuthFormData(prev => ({ ...prev, [name]: value }))
    setServerError('')
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await mutateAsync(authFormData)
      navigate(ROUTES.home, { replace: true })
    } catch (error) {
      const axiosError = error as AxiosError<{ errors?: string[] }>
      const message = axiosError.response?.data?.errors?.[0] || 'Неверный логин или пароль'
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
            onBlur={handleBlur}
            placeholder="Логин"
            className={`min-h-[46px] ${loginError && touched.login ? 'border-red-dark focus:ring-red-dark' : ''}`}
          />
          <div className="min-h-[18px] text-xs">
            <p
              className={`
              ${loginError && touched.login ? 'text-text-red-dark opacity-100' : 'opacity-0'} transition-opacity
            `}
            >
              {loginError}
            </p>
          </div>
        </div>

        <div className="relative">
          <Input
            name="password"
            value={authFormData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type={showPassword ? 'text' : 'password'}
            placeholder="Введите пароль"
            className={`min-h-[46px] ${passwordError && touched.password ? 'border-red-dark' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
          </button>
        </div>

        <div className="text-xs min-h-[19px]">
          <p
            className={`
            ${passwordError && touched.password ? 'text-text-red-dark opacity-100' : 'opacity-0'} transition-opacity
          `}
          >
            {passwordError}
          </p>
        </div>

        <div className="min-h-[19px] text-xs text-text-red-dark mb-2">{serverError}</div>

        <button
          type="button"
          className={`
            text-text-grey-dark text-xs mb-6 inline-block cursor-pointer outline-0 hover:text-text-grey-light
            focus:ring-1 focus:ring-yellow-accent-dark transition-[color,shadow] duration-300
          `}
          onClick={() => openRecoveryModal()}
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
