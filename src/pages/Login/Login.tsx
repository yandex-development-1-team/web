import { Navigate } from 'react-router-dom'
import loginImage from '@/assets/images/Login_Image.jpg'
import { EventIcon } from '@/assets/icons'
import { LoginForm } from './LoginForm'
import { usePermissions } from '@/hooks/usePermissions'
import { ROUTES } from '@/app/router'

const Login = () => {
  const { hasRole } = usePermissions()
  if (hasRole('admin') || hasRole('manager')) {
    return <Navigate to={ROUTES.home} replace />
  }

  return (
    <div className="flex w-full h-screen bg-grey-extra-light p-[20px] gap-[20px]">
      <div className="flex flex-col w-[445px] min-w-[445px] h-full pt-[20px] pr-[66px] pl-[67px] rounded-[8px] bg-white">
        <EventIcon className="h-[51px] w-[96px]" />
        <div className="flex flex-col justify-center flex-1">
          <h2 className="mb-[32px] font-bold text-[32px] text-left">Вход</h2>
          <div className="min-h-[270px]">
            <LoginForm />
          </div>
        </div>
      </div>

      <div className="flex-1">
        <img src={loginImage} alt="картинка" className="w-full h-full object-cover rounded-[8px]" />
      </div>
    </div>
  )
}
export const Component = Login
