import type { IBox, IProject } from '@/types/solutions'
import type { IIndicatorValues } from '@/types/indicators'

export const mockIndicatorsValues: IIndicatorValues[] = [
  { id: 0, value: 5 },
  { id: 1, value: 25 },
  { id: 2, value: 10 },
  { id: 3, value: 4 }
]

export const mockBoxes: IBox[] = [
  { id: 0, name: 'Название коробки' },
  { id: 1, name: 'Название коробки' },
  { id: 2, name: 'Название коробки' },
  { id: 3, name: 'Название коробки' }
]

export const mockProjects: IProject[] = [
  { id: 0, name: 'Название спецпроекта' },
  { id: 1, name: 'Название спецпроекта' },
  { id: 2, name: 'Название спецпроекта' },
  { id: 3, name: 'Название спецпроекта' }
]
