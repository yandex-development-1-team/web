const EXPORT_BASE = '/export' as const
const BOXES_BASE = '/boxes/' as const

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
  },
  boxes: {
    byId: (id: string) => `${BOXES_BASE}${id}`,
    get: `${BOXES_BASE}`
  }
} as const
