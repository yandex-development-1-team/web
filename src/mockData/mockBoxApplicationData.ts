import type { IBoxApplication } from "@/types/applications"
import mockPhoto from './mock_photo.jpg'

export const mockBoxApplicationData: IBoxApplication = {
  id: 0,
  client: {
    name: 'Иван Иванов',
    organization: 'Яндекс',
    telegram: '@tgclient',
    position: 'Менеджер'
  },
  reservation: {
    date: '10.12.2025',
    time: '20:00'
  },
  processing: {
    manager: {
      name: 'Анастасия Дмитриева',
      photo: mockPhoto
    },
    boxName: 'Приватная экскурсия',
    status: 'В работе',
    applicationDate: '01.11.2025'
  }
}
