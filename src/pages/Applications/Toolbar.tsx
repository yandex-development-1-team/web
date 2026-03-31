import { Button, Input, Select } from '@/components/ui'
import { useSelect } from '@/hooks/useTypedSearchParams'
import { cn } from '@/lib/utils.clsx'
import type { ComponentProps } from 'react'
import { applicationsParamsSchema, type ApplicationParamsType } from './applications.types'

const statusOptions = {
  options: [
    {
      value: 'all',
      label: 'Все статусы'
    },
    {
      value: 'queue',
      label: 'В очереди'
    },
    {
      value: 'in_progress',
      label: 'В работе'
    },
    {
      value: 'done',
      label: 'Завершено'
    }
  ],
  placeholder: '',
  classNames: {
    trigger: '',
    value: 'all',
    content: '',
    item: 'string'
  }
}
const appOptions = {
  options: [
    {
      value: 'all',
      label: 'Все заявки'
    },
    {
      value: '777',
      label: 'Мои заявки'
    }
  ],
  placeholder: '',
  classNames: {
    trigger: '',
    value: 'all',
    content: '',
    item: ''
  }
}

type ToolbarPropsType = ComponentProps<'div'>

export const Toolbar = ({ className, ...props }: ToolbarPropsType) => {
  const { params, setTypedParams } = useSelect(applicationsParamsSchema)

  const handleValueChange = (key: keyof ApplicationParamsType) => {
    return (value: string) => {
      setTypedParams({ [key]: value })
    }
  }

  return (
    <div className={cn('flex justify-between', className)} {...props}>
      <div className="flex gap-5">
        <Input buttonarialabel={''} icon={''} onClick={() => {}} className="w-full min-w-78" />
        <Select
          options={appOptions.options}
          placeholder={appOptions.placeholder}
          defaultValue={params.created_by}
          onValueChange={handleValueChange('created_by')}
        />
        <Select
          options={statusOptions.options}
          placeholder={statusOptions.placeholder}
          defaultValue={params.status}
          onValueChange={handleValueChange('status')}
        />
      </div>
      <Button variant={'primary'} label="Экспорт XLSX" size={'default'}></Button>
    </div>
  )
}
