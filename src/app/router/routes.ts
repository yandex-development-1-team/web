import 'react-router-dom'

export const ROUTES = {
  home: '/',
  login: '/login',

  boxSolutions: '/box-solutions',
  specialProjects: '/special-projects',
  applications: '/applications',
  resources: '/resources',

  stats: '/stats',
  statsAttendance: '/stats/attendance',
  statsApplications: '/stats/applications',
  statsPopularity: '/stats/popularity',
  statsDataExport: '/stats/data-export',
  statsUsers: '/stats/users',

  manageSolutions: '/manage-solutions',
  schedule: '/schedule',

  employees: '/employees',
  employeesCreate: '/employees/create',
  employeesView: '/employees/:employeeId',
  employeesEdit: '/employees/:employeeId/edit',

  settings: '/settings'
} as const

type PathParams = {
  [ROUTES.employeesEdit]: {
    employeeId: string
  }
  [ROUTES.employeesView]: {
    employeeId: string
  }
}

declare module 'react-router-dom' {
  interface Register {
    params: PathParams
  }
}
