import { Button, Input } from '@/components/ui'
import { useState } from 'react'
import { Eye } from '@/assets/icons'

export const LoginForm = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const validateLogin = (value: string) => {
    if (!value.trim()) return 'Логин обязателен'
    if (value.length < 1) return 'Минимум 1 символ'
    if (!/^[a-zA-Z0-9]+$/.test(value)) return 'Только латиница и цифры'
    return ''
  }

  const validatePassword = (value: string) => {
    if (!value) return 'Пароль обязателен'
    if (value.length < 8) return 'Минимум 8 символов'
    return ''
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const loginErr = validateLogin(login)
    const passwordErr = validatePassword(password)

    setLoginError(loginErr)
    setPasswordError(passwordErr)

    if (loginErr || passwordErr) return

    console.log('Форма валидна')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <Input
          value={login}
          onChange={e => {
            setLogin(e.target.value)
            setLoginError(validateLogin(e.target.value))
          }}
          placeholder="Логин"
          className={`min-h-[46px] ${loginError ? 'border-red-dark focus:ring-red-dark' : ''}`}
        />
        <div className="min-h-[18px] text-xs">
          <p className={`${loginError ? 'text-red-dark opacity-100' : 'opacity-0'} transition-opacity`}>{loginError}</p>
        </div>
      </div>

      <div className="relative">
        <Input
          variant="text"
          value={password}
          onChange={e => {
            setPassword(e.target.value)
            setPasswordError(validatePassword(e.target.value))
          }}
          type={showPassword ? 'text' : 'password'}
          placeholder="Введите пароль"
          className={`min-h-[46px] ${passwordError ? 'border-red-dark' : ''}`}
        />

        <button
          type="button"
          onClick={() => setShowPassword(s => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <Eye />
        </button>
      </div>
      <div className="text-xs">
        <p className={`${passwordError ? 'text-red-dark opacity-100' : 'opacity-0'} transition-opacity`}>
          {passwordError}
        </p>
      </div>
      <a href="#!" className="text-text-grey-dark text-xs mb-6 inline-block">
        Забыли пароль?
      </a>

      <Button
        type="submit"
        disabled={!!loginError || !!passwordError || !login || !password}
        className="w-full min-h-[46px] bg-yellow-accent-light text-text text-button font-semibold rounded-[12px] py-[12px]"
      >
        Войти
      </Button>
    </form>
  )
}
