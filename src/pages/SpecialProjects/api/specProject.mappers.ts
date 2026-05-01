import type { IProject } from '@/types/solutions'
import type { ICreateSpecialProjectDTO, ISpecialProject, IUpdateSpecialProjecDTO } from '../specialProjects.types'

function isLink(str: string | undefined) {
  if (!str) {
    return null
  }

  return str.startsWith('https://') || str.startsWith('http://') ? str : null
}

export const mapProjectToIProject = (dto: ISpecialProject): IProject => {
  return {
    id: dto?.id || '',
    title: dto?.title || '',
    description: dto?.description || '',
    image: dto?.image || undefined,
    isActive: dto?.status === 'active'
  }
}

export const mapProjectToEditData = (data: IProject): IUpdateSpecialProjecDTO => {
  return {
    id: Number(data.id),
    description: data.description,
    title: data.title,
    image: isLink(data?.image) ? data.image : null,
    status: data.isActive ? 'active' : 'inactive'
  }
}

export const mapProjectToCreateData = (data: IProject): ICreateSpecialProjectDTO => {
  return {
    description: data.description,
    title: data.title,
    image: isLink(data?.image) ? data.image : null,
    status: data.isActive ? 'active' : 'inactive'
  }
}
