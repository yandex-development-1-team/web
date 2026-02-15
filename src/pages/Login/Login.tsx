import { useState } from 'react'
import loginImage from '@/assets/images/Login_Image.png'

import EventLogo from '@/assets/icons/Event.svg?react'
import EyeButton from '@/assets/icons/Eye.svg?react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="flex max-w-[1376px] w-full h-screen overflow-hidden py-[20px] px-[32px] gap-[20px] ">
      <div className="flex flex-col w-[445px] min-w-[445px] h-full pt-[20px] pr-[66px] pl-[67px] rounded-[8px] bg-white">
        <EventLogo className="h-[51px] w-[96px]" />
        <div className="flex flex-col justify-center flex-1 ">
          <h2 className="mb-[32px] font-bold text-[32px] text-left">Вход</h2>
          <form action="">
            <Input
              placeholder="Логин"
              required
              className="mb-[20px] rounded-[8px] p-[12px]  min-h-[46px] border-grey-light italic text-small"
            />
            <div className="relative mb-[4px]">
              <Input
                placeholder="Введите пароль"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={8}
                className="rounded-[12px] min-h-[46px] pr-[40px] italic font-[14px] border-grey-light"
              />

              <button
                type="button"
                onClick={() => setShowPassword(show => !show)}
                className="absolute right-[12px] top-1/2 -translate-y-1/2"
              >
                <EyeButton className="w-[23px] text-text-grey-dark" />
              </button>
            </div>

            <div className="mb-[40px]">
              <a href="#!" className="text-left text-text-grey-dark">
                Забыли пароль?
              </a>
            </div>

            <Button className="w-full min-h-[46px] bg-yellow-accent-light text-text text-button font-semibold rounded-[12px] py-[12px]">
              Войти
            </Button>
          </form>
        </div>
      </div>

      {/* правая часть */}
      <div className="flex-1">
        <img src={loginImage} alt="картинка" className="w-full h-full object-cover rounded-[8px]" />
      </div>
    </div>
  )
}
export const Component = Login
