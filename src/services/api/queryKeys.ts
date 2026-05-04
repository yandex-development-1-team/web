export const BOX_SOLUTIONS_KEYS = {
  all: ['boxes'] as const,
  detail: (id: string | number | null) => [...BOX_SOLUTIONS_KEYS.all, 'boxDetails', String(id)]
}
