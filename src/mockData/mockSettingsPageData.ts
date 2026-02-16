import type { ITextFieldValue, IAccountAccessRight } from '@/pages/Settings/Settings.types'

export const mockTextFieldsValues: ITextFieldValue[] = [
  { id: 0, value: 'Здравствуйте!' },
  { id: 1, value: 'Запись подтверждена' },
  { id: 2, value: 'Напоминаем за неделю' },
  { id: 3, value: 'Напоминаем за сутки' },
  { id: 4, value: 'Бронирование отменено' },
  { id: 5, value: 'Благодарим!' },
  { id: 6, value: 'Системная ошибка' }
]

export const mockAccountAccessRights: IAccountAccessRight[] = [
  {
    accountId: 0,
    accessRights: [
      { id: 0, value: true },
      { id: 1, value: true },
      { id: 2, value: true },
      { id: 3, value: true },
      { id: 4, value: true },
      { id: 5, value: true },
      { id: 6, value: true },
      { id: 7, value: true },
      { id: 8, value: true },
      { id: 9, value: true },
      { id: 10, value: true },
      { id: 11, value: true },
      { id: 12, value: true },
      { id: 13, value: true },
      { id: 14, value: true },
      { id: 15, value: true },
      { id: 16, value: true }
    ]
  },
  {
    accountId: 1,
    accessRights: [
      { id: 0, value: true },
      { id: 1, value: true },
      { id: 2, value: false },
      { id: 3, value: true },
      { id: 4, value: true },
      { id: 5, value: false },
      { id: 6, value: true },
      { id: 7, value: true },
      { id: 8, value: false },
      { id: 9, value: true },
      { id: 10, value: true },
      { id: 11, value: false },
      { id: 12, value: true },
      { id: 13, value: false },
      { id: 14, value: true },
      { id: 15, value: true },
      { id: 16, value: true }
    ]
  },
  {
    accountId: 2,
    accessRights: [
      { id: 0, value: true },
      { id: 1, value: true },
      { id: 2, value: false },
      { id: 3, value: true },
      { id: 4, value: true },
      { id: 5, value: false },
      { id: 6, value: true },
      { id: 7, value: true },
      { id: 8, value: false },
      { id: 9, value: true },
      { id: 10, value: true },
      { id: 11, value: false },
      { id: 12, value: false },
      { id: 13, value: false },
      { id: 14, value: true },
      { id: 15, value: false },
      { id: 16, value: true }
    ]
  },
  {
    accountId: 3,
    accessRights: [
      { id: 0, value: true },
      { id: 1, value: false },
      { id: 2, value: false },
      { id: 3, value: true },
      { id: 4, value: false },
      { id: 5, value: false },
      { id: 6, value: true },
      { id: 7, value: false },
      { id: 8, value: false },
      { id: 9, value: true },
      { id: 10, value: false },
      { id: 11, value: false },
      { id: 12, value: false },
      { id: 13, value: false },
      { id: 14, value: false },
      { id: 15, value: false },
      { id: 16, value: false }
    ]
  }
]
