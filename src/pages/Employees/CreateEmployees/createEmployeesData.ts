import type { IDepartment, IRole } from './CreateEmployees.types'

export const departments: IDepartment[] = [{ id: 1, name: 'Маркетинг' }]

export const roles: IRole[] = [
  { id: 1, name: 'Администратор', description: 'Полный доступ', accessType: 'full' },
  { id: 2, name: 'Менеджер 1 звена', description: 'Ограниченный доступ', accessType: 'limited' },
  { id: 3, name: 'Менеджер 2 звена', description: 'Ограниченный доступ', accessType: 'limited' },
  { id: 4, name: 'Менеджер 3 звена', description: 'Ограниченный доступ', accessType: 'limited' }
]

export const genderOptions = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' }
]

export const citizenshipOptions = [
  { value: 'РФ', label: 'РФ' },
  { value: 'Другое', label: 'Другое' }
]
