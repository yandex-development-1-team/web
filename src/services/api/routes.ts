const EXPORT_BASE = '/export' as const
const BOXES_BASE = '/boxes' as const
export const BOOKINGS_BASE = '/bookings/' as const
export const APPLICATIONS_BASE = '/applications/' as const
const RESOURCES_BASE = '/resources' as const

export const API_ROUTES = {
  items: '/items',

  login: '/auth/login',
  logout: '/auth/logout',
  refreshToken: '/auth/refresh',
  users: '/users',

  settings: {
    messages: '/settings/messages',
    permissions: (role?: string) => `/settings/permissions${role ? `/${role}` : ''}`
  },

  events: (id?: number) => `/events${id ? `/${id}` : ''}`,

  analytics: {
    boxes: '/analytics/boxes',
    export: '/analytics/export',
    users: '/analytics/users'
  },
  bookings: {
    get: BOOKINGS_BASE,
    byId: (id: string) => `${BOOKINGS_BASE}${id}`,
    changeStatus: (id: string) => `${BOOKINGS_BASE}${id}/status`
  },
  applications: {
    get: APPLICATIONS_BASE,
    byId: (id: string) => `${APPLICATIONS_BASE}${id}`,
    changeStatus: (id: string) => `${APPLICATIONS_BASE}${id}/status`
  },

  employees: (employeeId: string) => `/employee/${employeeId}`,

  export: {
    byId: (id: string) => `${EXPORT_BASE}/${id}`,
    deleteById: (id: string) => `${EXPORT_BASE}/${id}`,
    byPath: (path: string) => `${EXPORT_BASE}/${path}`
  },
  boxes: {
    byId: (id: string) => `${BOXES_BASE}/${id}`,
    deleteById: (id: string) => `${BOXES_BASE}/${id}`,
    get: `${BOXES_BASE}`
  },

  resources: {
    get: RESOURCES_BASE,
    orgInfo: `${RESOURCES_BASE}/org-info`,
    faq: `${RESOURCES_BASE}/faq`,
    eventSchedule: `${RESOURCES_BASE}/event-schedule`
  }
} as const
