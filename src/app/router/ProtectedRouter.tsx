import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTES } from './routes'
import { tokenStorage } from '../providers/axios/lib/tokenStorageInstance'

type Props = { children: ReactNode }

export const ProtectedRouter = ({ children }: Props) => {
  const token = tokenStorage.getToken()

  if (!token) {
    return <Navigate to={ROUTES.login} replace />
  }

  return <>{children}</>
}
