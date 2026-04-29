import type { IAccount, IAccessRightsGroup, IAccessRight, ITextField } from './Settings.types'
import { PERMISSIONS } from '@/hooks/usePermissions'
import { settingsMessagesServerNames } from './api/messages'

export const accounts: IAccount[] = [
  { id: 0, name: 'Администратор', description: 'Высший уровень доступа', serverName: 'admin' },
  { id: 1, name: 'Менеджер 1 звена', description: 'Полный уровень доступа', serverName: 'manager_1' },
  { id: 2, name: 'Менеджер 2 звена', description: 'Средний уровень доступа', serverName: 'manager_2' },
  { id: 3, name: 'Менеджер 3 звена', description: 'Низкий уровень доступа', serverName: 'manager_3' }
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
  { id: 0, groupId: 0, name: 'Просмотр таблицы заявок', serverName: PERMISSIONS.applicationsView },
  { id: 1, groupId: 0, name: 'Редактирование таблицы заявок', serverName: PERMISSIONS.applicationsEdit },
  { id: 2, groupId: 0, name: 'Удаление таблицы заявок', serverName: PERMISSIONS.applicationsDelete },
  { id: 3, groupId: 1, name: 'Создание коробок', serverName: PERMISSIONS.boxesCreate },
  { id: 4, groupId: 1, name: 'Редактирование коробок', serverName: PERMISSIONS.boxesEdit },
  { id: 5, groupId: 1, name: 'Удаление коробок', serverName: PERMISSIONS.boxesDelete },
  { id: 6, groupId: 2, name: 'Просмотр презентаций', serverName: PERMISSIONS.presentationsView },
  { id: 7, groupId: 2, name: 'Редактирование презентаций', serverName: PERMISSIONS.presentationsEdit },
  { id: 8, groupId: 2, name: 'Удаление презентаций', serverName: PERMISSIONS.presentationsDelete },
  { id: 9, groupId: 3, name: 'Просмотр спецпроектов', serverName: PERMISSIONS.specprojectsView },
  { id: 10, groupId: 3, name: 'Редактирование спецпроектов', serverName: PERMISSIONS.specprojectsEdit },
  { id: 11, groupId: 3, name: 'Удаление спецпроектов', serverName: PERMISSIONS.specprojectsDelete },
  { id: 12, groupId: 4, name: 'Просмотр', serverName: PERMISSIONS.analyticsView },
  { id: 13, groupId: 4, name: 'Скачивание', serverName: PERMISSIONS.analyticsDownload },
  { id: 14, groupId: 5, name: 'Афиша', serverName: PERMISSIONS.affiche },
  { id: 15, groupId: 5, name: 'Раздел о нас', serverName: PERMISSIONS.about },
  { id: 16, groupId: 5, name: 'FAQ', serverName: PERMISSIONS.faq }
]

export const textFields: ITextField[] = [
  { id: 0, name: 'Поле для приветствия', serverName: settingsMessagesServerNames.welcome_message },
  { id: 1, name: 'Текст для подтверждения записи', serverName: settingsMessagesServerNames.record_confirmation },
  {
    id: 2,
    name: 'Напоминание №1 о мероприятии (за 1 неделю)',
    serverName: settingsMessagesServerNames.event_reminder_for_week
  },
  {
    id: 3,
    name: 'Напоминание №2 о мероприятии (за 24 часа)',
    serverName: settingsMessagesServerNames.event_reminder_for_24_hours
  },
  { id: 4,
    name: 'Текст сообщения при отмене бронирования',
    serverName: settingsMessagesServerNames.cancellation_message
  },
  { id: 5, name: 'Благодарность по завершению мероприятия', serverName: settingsMessagesServerNames.thanks_message },
  { id: 6, name: 'Текст системной ошибки', serverName: settingsMessagesServerNames.system_err_message }
]
