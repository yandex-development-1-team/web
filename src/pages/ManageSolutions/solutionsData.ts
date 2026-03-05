import type { IIndicator } from '@/types/indicators'

export const indicators: IIndicator[] = [
  { id: 0, name: 'Созданные' },
  { id: 1, name: 'В работе' },
  { id: 2, name: 'Реализованные' },
  { id: 3, name: 'Нереализованные', warningColor: true }
]
