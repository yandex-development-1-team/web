import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from './routes'
import { LazyLogin } from '@/pages/Login'
import { LazyHome } from '@/pages/Home'
import { LazyBoxSolutions } from '@/pages/BoxSolutions'
import { LazySpecialProjects } from '@/pages/SpecialProjects'
import { LazyApplications } from '@/pages/Applications'
import { LazyResources } from '@/pages/Resources'
import { LazyNotFound } from '@/pages/NotFound'
import { LazyAttendance, LazyDataExport, LazyPopularity, LazyStats, LazyUsersStats } from '@/pages/Stats'
import { LazyManageSolutions } from '@/pages/ManageSolutions'
import { LazySchedule } from '@/pages/Schedule'
import { LazyCreateEmployees, LazyEditEmployees, LazyEmployees, LazyViewEmployees } from '@/pages/Employees'
import { LazySettings } from '@/pages/Settings'
import { Layout } from '@/components/layout'

export const router = createBrowserRouter([
  {
    path: ROUTES.login,
    element: <LazyLogin />
  },
  {
    path: ROUTES.home,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LazyHome />
      },
      {
        path: ROUTES.boxSolutions,
        element: <LazyBoxSolutions />
      },
      {
        path: ROUTES.specialProjects,
        element: <LazySpecialProjects />
      },
      {
        path: ROUTES.applications,
        element: <LazyApplications />
      },
      {
        path: ROUTES.resources,
        element: <LazyResources />
      },
      {
        path: ROUTES.stats,
        element: <LazyStats />
      },
      {
        path: ROUTES.statsAttendance,
        element: <LazyAttendance />
      },
      {
        path: ROUTES.statsApplications,
        element: <LazyApplications />
      },
      {
        path: ROUTES.statsPopularity,
        element: <LazyPopularity />
      },
      {
        path: ROUTES.statsDataExport,
        element: <LazyDataExport />
      },
      {
        path: ROUTES.statsUsers,
        element: <LazyUsersStats />
      },
      {
        path: ROUTES.manageSolutions,
        element: <LazyManageSolutions />
      },
      {
        path: ROUTES.schedule,
        element: <LazySchedule />
      },
      {
        path: ROUTES.employees,
        element: <LazyEmployees />
      },
      {
        path: ROUTES.employeesCreate,
        element: <LazyCreateEmployees />
      },
      {
        path: ROUTES.employeesEdit,
        element: <LazyEditEmployees />
      },
      {
        path: ROUTES.employeesView,
        element: <LazyViewEmployees />
      },
      {
        path: ROUTES.settings,
        element: <LazySettings />
      },
      {
        path: '*',
        element: <LazyNotFound />
      }
    ]
  }
])
