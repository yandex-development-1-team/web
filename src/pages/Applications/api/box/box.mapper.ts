import type { IBoxApplication } from '@/types/applications'
import type { BoxListItemType, StatusType } from '../../applications.types'
import type { BookingDTO, BookingListItemDTO } from './types'

export const mapBoxDTOToBoxApplication = (dto: BookingDTO): IBoxApplication => {
  return {
    id: dto.id,
    client: {
      name: dto.guest_name,
      organization: dto.guest_organization,
      telegram: dto.guest_contact,
      position: dto.guest_position
    },
    reservation: {
      date: dto.booking_date,
      time: dto.booking_time
    },
    processing: {
      manager: {
        name: dto.manager_name
        // photo: '',
      },
      boxName: dto.service_name,
      status: dto.status,
      applicationDate: dto.created_at
    }
  }
}

export const mapBoxListItem = (dto: BookingListItemDTO): BoxListItemType => {
  return {
    id: dto.id,
    status: dto.status as StatusType,
    guestName: dto.guest_name,
    guestContact: dto.guest_contact,
    serviceName: dto.service_name,
    managerId: dto.manager_id,
    managerName: dto.manager_name,
    createdAt: dto.created_at
  }
}
