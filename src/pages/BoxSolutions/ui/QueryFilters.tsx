import { SearchIcon } from '@/assets/icons'
import { Input, Select } from '@/components/ui'
import { useUrlFilters } from '@/hooks/useUrlFilters'
import { cn } from '@/lib/utils.clsx'
import { type ComponentProps } from 'react'
import { boxSolutionsParamsSchema } from '../BoxSolutions.types'

const statusSelectOptions = {
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
  label: 'Статус',
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
        <span className="text-xxs text-grey-light">Название коробки</span>
        <Input
          placeholder=""
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
        <span className="text-xxs text-grey-light">{statusSelectOptions.label}</span>
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
