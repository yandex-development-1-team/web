import type { IRole } from './CreateEmployees.types'

export const roles: IRole[] = [
  { id: 0, name: 'Администратор', description: 'Полный доступ', accessType: 'full' },
  { id: 1, name: 'Менеджер 1 звена', description: 'Ограниченный доступ', accessType: 'limited' },
  { id: 2, name: 'Менеджер 2 звена', description: 'Ограниченный доступ', accessType: 'limited' },
  { id: 3, name: 'Менеджер 3 звена', description: 'Ограниченный доступ', accessType: 'limited' }
]
