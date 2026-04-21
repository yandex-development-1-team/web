import { createBrowserRouter, Outlet } from 'react-router-dom'
import { ROUTES } from './routes'
import { NotificationProvider } from '@/app/providers/notification'
import { AxiosProvider } from '@/app/providers/axios'
import App from '@/App'
import { QueryProvider } from '@/app/providers/tanstack-query'
import { ProtectedRoute } from './protectedRoute'
import { PERMISSIONS } from './permissions'
import { HomeIndex } from '@/pages/Home/HomeIndex'

export const router = createBrowserRouter(
  [
    {
      element: (
        <QueryProvider>
          <NotificationProvider>
            <AxiosProvider>
              <Outlet />
            </AxiosProvider>
          </NotificationProvider>
        </QueryProvider>
      ),
      children: [
        {
          path: ROUTES.login,
          lazy: () => import('@/pages/Login/Login')
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              element: <App />,
              children: [
                {
                  path: ROUTES.home,
                  element: <HomeIndex />
                },
                {
                  path: ROUTES.boxSolutions,
                  lazy: () => import('@/pages/BoxSolutions/BoxSolutions')
                },
                {
                  element: <ProtectedRoute requiredPermission={PERMISSIONS.specprojectsView} />,
                  children: [
                    {
                      path: ROUTES.specialProjects,
                      lazy: () => import('@/pages/SpecialProjects/SpecialProjects')
                    }
                  ]
                },
                {
                  element: <ProtectedRoute requiredPermission={PERMISSIONS.applicationsView} />,
                  children: [
                    {
                      path: ROUTES.applications,
                      lazy: () => import('@/pages/Applications/Applications')
                    }
                  ]
                },
                {
                  path: ROUTES.resources,
                  lazy: () => import('@/pages/Resources/Resources')
                },
                {
                  element: <ProtectedRoute requiredRole="admin" />,
                  children: [
                    {
                      path: ROUTES.stats,
                      lazy: () => import('@/pages/Stats/Stats')
                    },
                    {
                      path: ROUTES.statsAttendance,
                      lazy: () => import('@/pages/Stats/Attendance/Attendance')
                    },
                    {
                      path: ROUTES.statsApplications,
                      lazy: () => import('@/pages/Stats/ApplicationsStats/ApplicationStats')
                    },
                    {
                      path: ROUTES.statsPopularity,
                      lazy: () => import('@/pages/Stats/Popularity/Popularity')
                    },
                    {
                      path: ROUTES.statsDataExport,
                      lazy: () => import('@/pages/Stats/DataExport/DataExport')
                    },
                    {
                      path: ROUTES.statsUsers,
                      lazy: () => import('@/pages/Stats/UsersStats/UsersStats')
                    },
                    {
                      path: ROUTES.manageSolutions,
                      lazy: () => import('@/pages/ManageSolutions/ManageSolutions')
                    },
                    {
                      path: ROUTES.schedule,
                      lazy: () => import('@/pages/Schedule/Schedule')
                    },
                    {
                      path: ROUTES.employees,
                      lazy: () => import('@/pages/Employees/Employees')
                    },
                    {
                      path: ROUTES.employeesCreate,
                      lazy: () => import('@/pages/Employees/CreateEmployees/CreateEmployees')
                    },
                    {
                      path: ROUTES.employeesEdit,
                      lazy: () => import('@/pages/Employees/id/EditEmployees/EditEmployees')
                    },
                    {
                      path: ROUTES.employeesView,
                      lazy: () => import('@/pages/Employees/id/ViewEmployees/ViewEmployees')
                    },
                    {
                      path: ROUTES.settings,
                      lazy: () => import('@/pages/Settings/Settings')
                    }
                  ]
                },
                {
                  path: '*',
                  lazy: () => import('@/pages/NotFound/NotFound')
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  {
    basename: import.meta.env.BASE_URL
  }
)
