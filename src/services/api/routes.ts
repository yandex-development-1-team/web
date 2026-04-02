const EXPORT_BASE = '/export' as const

export const API_ROUTES = {
  items: '/items',

  analytics: {
    boxes: '/analytics/boxes',
    export: '/analytics/export'
  },

  export: {
    byId: (id: string) => `${EXPORT_BASE}/${id}`,
    deleteById: (id: string) => `${EXPORT_BASE}/${id}`,
    byPath: (path: string) => `${EXPORT_BASE}/${path}`
  }
} as const
