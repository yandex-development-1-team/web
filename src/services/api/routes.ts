const EXPORT_BASE = '/export' as const
const BOXES_BASE = '/boxes' as const
const RESOURCES_BASE = '/resources' as const

export const API_ROUTES = {
  items: '/items',

  login: '/auth/login',
  logout: '/auth/logout',
  refreshToken: '/auth/refresh',
  users: '/users',
  analytics: {
    boxes: '/analytics/boxes',
    export: '/analytics/export'
  },

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
