import type { Column } from '@/components/ui/DataTable/DataTable.types'
import type { UserListItem, UserRole, UserStatus } from './employees.types'

export const USER_ROLE_MAP: Record<UserRole, { id: number; table: string; details: string }> = {
  admin: {
    id: 0,
    table: 'А',
    details: 'Администратор'
  },
  manager_1: {
    id: 1,
    table: '1',
    details: 'Менеджер 1 звена'
  },
  manager_2: {
    id: 2,
    table: '2',
    details: 'Менеджер 2 звена'
  },
  manager_3: {
    id: 3,
    table: '3',
    details: 'Менеджер 3 звена'
  },
  user: {
    id: 4,
    table: 'П',
    details: 'Пользователь'
  }
}

export const COLUMNS_CONFIG: Column<UserListItem>[] = [
  {
    key: 'id',
    label: 'ID',
    className: 'w-20',
    render: value => {
      return <span>{value}</span>
    }
  },
  {
    key: 'fullName',
    label: 'Имя сотрудника',
    sortable: true,
    className: 'w-[20%]',
    render: value => <span className="cursor-pointer">{value}</span>
  },
  {
    key: 'department',
    label: 'Отдел, руководитель',
    className: 'w-40',
    render: (_, row) => (
      <div className="flex flex-col">
        <div>{row.department}</div>
        <div className="text-grey-dark text-sm">{row.supervisor || '—'}</div>
      </div>
    )
  },
  { key: 'position', label: 'Должность', className: 'w-35' },
  {
    key: 'role',
    label: 'Уровень',
    className: 'w-30',
    render: (_, row) => (
      <div className="flex justify-center gap-3">
        <span>{USER_ROLE_MAP[row.role].table}</span>
      </div>
    )
  },
  {
    key: 'phoneNumber',
    label: 'Телефон',
    className: 'w-40',
    render: value => {
      return <span>{value}</span>
    }
  },
  { key: 'email', label: 'Эл. адрес', className: 'w-55' }
]

type SortOptions = {
  options: {
    value: string
    label: string
  }[]
}

export const SORT_OPTIONS: SortOptions = {
  options: [
    {
      value: 'department',
      label: 'По отделу'
    },
    {
      value: 'position',
      label: 'По должности'
    },
    {
      value: 'level',
      label: 'По уровню'
    }
  ]
}

export const STATUS_MAP: Record<
  UserStatus,
  { checked: boolean; label: string; description: string; nextStatus: UserStatus }
> = {
  active: {
    checked: true,
    label: 'Активен',
    description: 'При отключении сотрудник потеряет доступ к системе ',
    nextStatus: 'blocked'
  },
  blocked: {
    checked: false,
    label: 'Не активен',
    description: 'Доступ временно отключен',
    nextStatus: 'active'
  },
  invited: {
    checked: false,
    label: 'Приглашен',
    description: 'Отправлено приглашение',
    nextStatus: 'invited'
  }
}
