type Role = {
  id: number
  name: string
  description: string
  role: 'admin' | 'manager_1' | 'manager_2' | 'manager_3' | 'user'
}

export const roles: Role[] = [
  { id: 0, name: 'Администратор', description: 'Полный доступ', role: 'admin' },
  { id: 1, name: 'Менеджер 1 звена', description: 'Ограниченный доступ', role: 'manager_1' },
  { id: 2, name: 'Менеджер 2 звена', description: 'Ограниченный доступ', role: 'manager_2' },
  { id: 3, name: 'Менеджер 3 звена', description: 'Ограниченный доступ', role: 'manager_3' }
]
