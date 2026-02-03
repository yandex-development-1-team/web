import React from 'react'

const LazyLogin = React.lazy(() => import('./Login'))

export { LazyLogin }
