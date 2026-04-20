import type { ISpecialProjectApplication } from '@/types/applications'
import type { SpecialProjectListItemType, StatusType } from '../../applications.types'
import type { ApplicationDTO, ApplicationListItemDTO } from './types'

export const mapApplicationListItem = (dto: ApplicationListItemDTO): SpecialProjectListItemType => {
  return {
    id: dto.id,
    status: dto.status as StatusType,
    managerId: dto.manager_id,
    managerName: dto.manager_name,
    customerName: dto.customer_name,
    contactInfo: dto.contact_info,
    createdAt: dto.created_at
  }
}

export const mapApplicationToSpecialProject = (dto: ApplicationDTO): ISpecialProjectApplication => {
  return {
    id: dto.id,
    client: {
      name: dto.customer_name,
      telegram: dto.contact_info
    },
    processing: {
      manager: {
        name: dto.manager_name
      },
      status: dto.status,
      applicationDate: dto.created_at
    },
    request: {
      questions: [],
      text: dto.description || '',
      textLabel: 'Описание проекта'
    }
  }
}
