import type { IDepartment, IRole } from './CreateEmployees.types'

export const departments: IDepartment[] = [{ id: 1, name: 'Маркетинг' }]

export const roles: IRole[] = [
  { id: 1, name: 'Администратор', description: 'Полный доступ', accessType: 'full' },
  { id: 2, name: 'Менеджер 1 звена', description: 'Ограниченный доступ', accessType: 'limited' },
  { id: 3, name: 'Менеджер 2 звена', description: 'Ограниченный доступ', accessType: 'limited' },
  { id: 4, name: 'Менеджер 3 звена', description: 'Ограниченный доступ', accessType: 'limited' }
]

export const chief = [
  { id: 1, name: 'Петров П.П.' },
  { id: 2, name: 'Иванов И.И.' },
  { id: 3, name: 'Иванов И.И.' }
]
