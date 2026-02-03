import React from 'react'

const LazyApplications = React.lazy(() => import('./Applications'))

export { LazyApplications }
