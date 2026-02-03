import React from 'react'

const LazyEmployees = React.lazy(() => import('./Employees'))
const LazyCreateEmployees = React.lazy(() => import('./CreateEmployees/CreateEmployees'))
const LazyEditEmployees = React.lazy(() => import('./id/EditEmployees/EditEmployees'))
const LazyViewEmployees = React.lazy(() => import('./id/ViewEmployees/ViewEmployees'))

export { LazyEmployees, LazyCreateEmployees, LazyEditEmployees, LazyViewEmployees }
