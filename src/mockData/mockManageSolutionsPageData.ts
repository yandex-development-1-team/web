import type { IBox, IProject } from '@/types/solutions'
import type { IIndicatorValues } from '@/types/indicators'

export const mockIndicatorsValues: IIndicatorValues[] = [
  { id: 0, value: 5 },
  { id: 1, value: 25 },
  { id: 2, value: 10 },
  { id: 3, value: 4 }
]

export const mockBoxes: Pick<IBox, 'id' | 'title'>[] = [
  { id: 0, title: 'Название коробки' },
  { id: 1, title: 'Название коробки' },
  { id: 2, title: 'Название коробки' },
  { id: 3, title: 'Название коробки' }
]

export const mockProjects: Pick<IProject, 'id' | 'title'>[] = [
  { id: 0, title: 'Название спецпроекта' },
  { id: 1, title: 'Название спецпроекта' },
  { id: 2, title: 'Название спецпроекта' },
  { id: 3, title: 'Название спецпроекта' }
]
