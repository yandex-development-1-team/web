import React from 'react'

const LazyStats = React.lazy(() => import('./Stats'))
const LazyAttendance = React.lazy(() => import('./Attendance/Attendance'))
const LazyApplicationStats = React.lazy(() => import('./ApplicationsStats/ApplicationStats'))
const LazyPopularity = React.lazy(() => import('./Popularity/Popularity'))
const LazyDataExport = React.lazy(() => import('./DataExport/DataExport'))
const LazyUsersStats = React.lazy(() => import('./UsersStats/UsersStats'))

export { LazyStats, LazyAttendance, LazyApplicationStats, LazyPopularity, LazyDataExport, LazyUsersStats }
