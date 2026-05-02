export const BOX_SOLUTIONS_KEYS = {
  all: ['boxes'] as const,
  detail: (id: string | number | null) => [...BOX_SOLUTIONS_KEYS.all, 'boxDetails', String(id)]
}

export const USERS_KEYS = {
  all: ['users'] as const,
  details: (id: string | number | null | undefined) => [...USERS_KEYS.all, 'userDetails', String(id)]
}
