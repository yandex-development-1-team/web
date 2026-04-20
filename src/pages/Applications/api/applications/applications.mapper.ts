import type { ISpecialProjectApplication } from '@/types/applications'
import type { ApplicationListItemType, StatusType } from '../../applications.types'
import type { ApplicationDTO, ApplicationListItemDTO } from './types'

export const mapApplicationListItem = (dto: ApplicationListItemDTO): ApplicationListItemType => {
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
  // const statusMap: Record<ApplicationDTO['status'], TApplicationStatus> = {
  //   pending: 'В очереди',
  //   confirmed: 'В работе',
  //   cancelled: 'Готово'
  // }

  return {
    id: dto.id,
    client: {
      name: dto.customer_name,
      telegram: dto.contact_info
      // organization и position в DTO для Application отсутствуют
    },
    processing: {
      manager: {
        name: dto.manager_name
        // photo: undefined
      },
      status: dto.status,
      applicationDate: dto.created_at
      //   boxName: dto.service_name // если нужно отобразить название услуги
    },
    request: {
      questions: [], // Здесь будет массив IRequestQuestion[], если получите его отдельно
      text: dto.description || '',
      textLabel: 'Описание проекта'
    }
  }
}
