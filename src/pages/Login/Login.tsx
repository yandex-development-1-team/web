import { useState } from 'react'
import loginImage from '@/assets/images/Login_Image.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import EventLogo from '@/assets/icons/Event.svg?react'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="flex max-w-[1376px] w-full h-screen overflow-hidden py-[20px] px-[32px] gap-[20px] ">
      <div className="flex flex-col w-[445px] min-w-[445px] h-full pt-[20px] pr-[66px] pl-[67px] rounded-[8px] bg-[#fff]">
        <EventLogo className="h-[51px] w-[96px]" />
        <div className="flex flex-col justify-center flex-1 ">
          <h2 className="mb-[32px] font-bold text-[32px] text-left">Вход</h2>
          <form action="">
            <Input
              placeholder="Логин"
              required
              minLength={6}
              className="mb-[20px] rounded-[8px] py-[12px] px-[12px]  min-h-[46px] border-[#C5C6C5] italic font-[14px]"
            />
            <div className="relative mb-[4px]">
              <Input
                placeholder="Введите пароль"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={8}
                className="rounded-[12px] min-h-[46px] pr-[40px] italic font-[14px] border-[#C5C6C5]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(show => !show)}
                className="absolute right-[12px] top-1/2 -translate-y-1/2"
              >
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 14 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-[#BABABA]"
                >
                  <path
                    d="M13.2176 3.83C13.3835 4.01375 13.4753 4.25248 13.4753 4.5C13.4753 4.74752 13.3835 4.98625 13.2176 5.17C12.1676 6.3 9.77764 8.5 6.98764 8.5C4.19764 8.5 1.80764 6.3 0.757639 5.17C0.591799 4.98625 0.5 4.74752 0.5 4.5C0.5 4.25248 0.591799 4.01375 0.757639 3.83C1.80764 2.7 4.19764 0.5 6.98764 0.5C9.77764 0.5 12.1676 2.7 13.2176 3.83Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.98828 6.5C8.09285 6.5 8.98828 5.60457 8.98828 4.5C8.98828 3.39543 8.09285 2.5 6.98828 2.5C5.88371 2.5 4.98828 3.39543 4.98828 4.5C4.98828 5.60457 5.88371 6.5 6.98828 6.5Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-[40px]">
              <a href="#!" className="text-left text-[#8B8C8B]">
                Забыли пароль?
              </a>
            </div>

            <Button className="w-full min-h-[46px] bg-[#F4DB54] text-[#353434] font-semibold rounded-[12px] py-[12px]">
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
