import type { IProject } from '@/types/solutions'
import mockGallery from './mock_gallery.jpg'

export const mockProjects: IProject[] = [
  { id: 0, title: 'Большой театр', description: 'Театральная площадь, 1', image: mockGallery, status: true },
  { id: 1, title: 'Большой театр', description: 'Театральная площадь, 1', image: mockGallery, status: false },
  { id: 2, title: 'Большой театр', description: 'Театральная площадь, 1', image: mockGallery, status: false }
]

export const mockUrl = 'https://forms.yandex.ru/u/65f2a9c3e4b0a123456789ab/'
