import type { ISpecialProjectApplication } from '@/types/applications'
import mockPhoto from './mock_photo.jpg'

export const mockSpecialProjectApplicationData: ISpecialProjectApplication = {
  id: 1,
  client: {
    name: 'Иван Иванов',
    telegram: '@tgclient'
  },
  processing: {
    manager: {
      name: 'Анастасия Дмитриева',
      photo: mockPhoto
    },
    status: 'В работе',
    applicationDate: '01.11.2025'
  },
  request: {
    questions: [
      { label: 'Вопрос1', answer: 'Ответ1' },
      { label: 'Вопрос2', answer: 'Ответ2' }
    ],
    textLabel: 'Текст',
    text: 'Мы планируем реализовать спецпроект в формате закрытого мероприятия для партнёров компании. Основная цель — укрепление деловых отношений и повышение лояльности ключевых клиентов. Рассматриваем возможность брендирования пространства, организацию приватного просмотра и сопровождение со стороны команды. Готовы обсудить формат, сроки и дополнительные опции.'
  }
}
