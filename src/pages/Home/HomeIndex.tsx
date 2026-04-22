import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTES } from '@/app/router'
import { usePermissions } from '@/hooks/usePermissions'

const Home = lazy(() => import('./Home').then(module => ({ default: module.Component })))

export const HomeIndex = () => {
  const { hasRole, isLoading } = usePermissions()

  if (isLoading) return null

  if (hasRole('admin')) {
    return <Navigate to={ROUTES.stats} replace />
  }

  return <Home />
}
