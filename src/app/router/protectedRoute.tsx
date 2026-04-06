import { Navigate, Outlet } from 'react-router-dom'
import { usePermissions } from '@/hooks/usePermissions'
import { ROUTES } from './routes'
import { Component as ForbiddenPage } from '@/pages/Forbidden/Forbidden'

interface ProtectedRouteProps {
  requiredRole?: string
  requiredPermission?: string
}

export const ProtectedRoute = ({ requiredRole, requiredPermission }: ProtectedRouteProps) => {
  const { hasRole, hasAccess, isLoading, isLoggedIn } = usePermissions()

  if (isLoading) return null

  if (!isLoggedIn) {
    return <Navigate to={ROUTES.login} replace />
  }

  if (requiredRole && !hasRole(requiredRole) || requiredPermission && !hasAccess(requiredPermission)) {
    return <ForbiddenPage />
  }

  return <Outlet />
}
