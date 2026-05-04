import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTES } from '@/app/router/routes'
import { usePermissions } from '@/hooks/usePermissions'
import { Loader } from '@/components/ui'

const Home = lazy(() => import('./Home').then(module => ({ default: module.Component })))

export const HomeIndex = () => {
  const { hasRole, isLoading } = usePermissions()

  if (isLoading) {
    return <Loader className="min-h-[100vh]" />
  }

  if (hasRole('admin')) {
    return <Navigate to={ROUTES.stats} replace />
  }

  if (hasRole('manager')) {
    return <Home />
  }

  return <Navigate to={ROUTES.login} replace />
}
