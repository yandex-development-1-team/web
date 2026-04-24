import { SearchIcon } from '@/assets/icons'
import { Input, Select } from '@/components/ui'
import { useUrlFilters } from '@/hooks/useUrlFilters'
import { cn } from '@/lib/utils.clsx'
import { type ComponentProps } from 'react'
import { boxSolutionsParamsSchema } from '../BoxSolutions.types'

export type SelectProps = {
  options: {
    value: string
    label: string
  }[]
  placeholder: string
  classNames?: {
    trigger?: string
    value?: string
    content?: string
    item?: string
  }
}

const statusSelectOptions: SelectProps = {
  options: [
    {
      value: 'all',
      label: 'Все статусы'
    },
    {
      value: 'active',
      label: 'Активен в боте'
    },
    {
      value: 'inactive',
      label: 'Не активен в боте'
    }
  ],
  placeholder: 'Выберите статус',
  classNames: {
    trigger: 'grow bg-white min-w-58 w-full text-text',
    value: 'all',
    content: 'text-text',
    item: 'string'
  }
}

export const QueryFilters = ({ className, ...props }: ComponentProps<'div'>) => {
  const { params, updateOnSelectParams, updateOnSearchParams } = useUrlFilters(boxSolutionsParamsSchema)

  return (
    <div className={cn('flex gap-5', className)} {...props}>
      <div className="flex flex-col">
        <Input
          placeholder="Название коробки"
          variant="icon"
          icon={<SearchIcon />}
          iconPosition="inline-start"
          onClick={() => {}}
          defaultValue={params.search}
          onChange={updateOnSearchParams('search')}
          className="grow min-w-86 w-full bg-white text-text"
        />
      </div>
      <div className="flex flex-col">
        <Select
          options={statusSelectOptions.options}
          placeholder={statusSelectOptions.placeholder}
          classNames={statusSelectOptions.classNames}
          defaultValue={params.status ?? statusSelectOptions.options[0].value}
          onValueChange={updateOnSelectParams('status')}
        />
      </div>
    </div>
  )
}
