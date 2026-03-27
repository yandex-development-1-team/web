import type { Column } from '@/components/ui/DataTable/DataTable.types'
import { cn } from '@/lib/utils.clsx'
import type { ApplicationListItem, ApplicationStatus, ApplicationType } from '@/pages/Applications/Applications.types'

// Массив колонок для таблицы заявок
export const applicationColumns: Column<ApplicationListItem>[] = [
  {
    key: 'id',
    label: 'ID',
    className: 'w-[80px]'
  },
  {
    key: 'customer_name',
    label: 'Имя клиента',
    sortable: true
  },
  {
    key: 'source',
    label: 'Tg-аккаунт',
    render: value => (value === 'telegram_bot' ? '@tgprofile1' : '-')
  },
  {
    key: 'created_at',
    label: 'Дата заявки',
    sortable: true,
    render: value => new Date(value).toLocaleDateString('ru-RU')
  },
  {
    key: 'project_name',
    label: 'Название'
  },
  {
    key: 'status',
    label: 'Статус',
    render: value => {
      const labels: Record<ApplicationStatus, { title: string; styles: string }> = {
        queue: {
          title: 'В очереди',
          styles: 'bg-yellow-light'
        },
        in_progress: {
          title: 'В работе',
          styles: 'bg-green-light'
        },
        done: {
          title: 'Завершено',
          styles: 'bg-blue-light'
        }
      }
      const { title, styles } = labels[value as ApplicationStatus]
      // const options = Object.entries(labels).map(([key, item]) => ({
      //   value: key,
      //   label: item.title
      // }))
      // const classNames = {
      //   trigger: styles + ' border-0'
      // }
      return (
        <span className={cn(' flex justify-center items-center w-full h-7 rounded-sm', styles)}>{title}</span>
        // <Select key={value} value={value?.toString()} options={options} placeholder={title} classNames={classNames} />
      )
    }
  },
  {
    key: 'type',
    label: 'Тип',
    render: value => {
      const labels: Record<ApplicationType, string> = {
        box: 'Коробка',
        special_project: 'Спецпроект'
      }
      return labels[value as ApplicationType]
    }
  }
]
