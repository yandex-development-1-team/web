import type { IBoxApplication } from '@/types/applications'
import type { BookingListItemType, StatusType } from '../../applications.types'
import type { BookingDTO, BookingListItemDTO } from './types'

export const mapBookingToBoxApplication = (dto: BookingDTO): IBoxApplication => {
  // const statusMap: Record<BookingDTO['status'], TApplicationStatus> = {
  //   pending: 'В очереди',
  //   confirmed: 'В работе',
  //   cancelled: 'Завершено' // или добавьте новый статус в тип, если нужно
  // }

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

export const mapBookingListItem = (dto: BookingListItemDTO): BookingListItemType => {
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
