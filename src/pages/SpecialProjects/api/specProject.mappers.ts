import type { IProject } from '@/types/solutions'
import type { ISpecialProject } from '../specialProjects.types'

export const mapProjectToIProject = (dto: ISpecialProject): IProject => {
  return {
    id: dto?.id || '',
    title: dto?.title || '',
    description: dto?.description || '',
    image: dto?.image || undefined,
    isActive: dto?.status === 'active'
  }
}
