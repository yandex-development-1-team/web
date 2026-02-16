interface IAccount {
  id: number
  name: string
  description: string
}

interface IAccessRightsGroup {
  id: number
  name: string
}

interface IAccessRight {
  id: number
  groupId: number
  name: string
}

export const accounts: IAccount[] = [
  { id: 0, name: 'Администратор', description: 'Высший уровень доступа' },
  { id: 1, name: 'Менеджер 1 звена', description: 'Полный уровень доступа' },
  { id: 2, name: 'Менеджер 2 звена', description: 'Средний уровень доступа' },
  { id: 3, name: 'Менеджер 3 звена', description: 'Низкий уровень доступа' }
]

export const accessRightsGroups: IAccessRightsGroup[] = [
  { id: 0, name: 'Заявки' },
  { id: 1, name: 'Коробки' },
  { id: 2, name: 'Презентации' },
  { id: 3, name: 'Спецпроекты' },
  { id: 4, name: 'Аналитика' },
  { id: 5, name: 'Другое' }
]

export const accessRights: IAccessRight[] = [
  { id: 0, groupId: 0, name: 'Просмотр таблицы заявок' },
  { id: 1, groupId: 0, name: 'Редактирование таблицы заявок' },
  { id: 2, groupId: 0, name: 'Удаление таблицы заявок' },
  { id: 3, groupId: 1, name: 'Создание коробок' },
  { id: 4, groupId: 1, name: 'Редактирование коробок' },
  { id: 5, groupId: 1, name: 'Удаление коробок' },
  { id: 6, groupId: 2, name: 'Просмотр презентаций' },
  { id: 7, groupId: 2, name: 'Редактирование презентаций' },
  { id: 8, groupId: 2, name: 'Удаление презентаций,' },
  { id: 9, groupId: 3, name: 'Просмотр спецпроектов' },
  { id: 10, groupId: 3, name: 'Редактирование спецпроектов' },
  { id: 11, groupId: 3, name: 'Удаление спецпроектов,' },
  { id: 12, groupId: 4, name: 'Просмотр' },
  { id: 13, groupId: 4, name: 'Скачивание' },
  { id: 14, groupId: 5, name: 'Афиша' },
  { id: 15, groupId: 5, name: 'Раздел о нас' },
  { id: 16, groupId: 5, name: 'FAQ' }
]

export const textFields = [
  { id: 0, name: 'Поле для приветствия' },
  { id: 1, name: 'Текст для подтверждения записи' },
  { id: 2, name: 'Напоминание №1 о мероприятии (за 1 неделю)' },
  { id: 3, name: 'Напоминание №2 о мероприятии (за 24 часа)' },
  { id: 4, name: 'Текст сообщения при отмене бронирования' },
  { id: 5, name: 'Благодарность по завершению мероприятия' },
  { id: 6, name: 'Текст системной ошибки' }
]
