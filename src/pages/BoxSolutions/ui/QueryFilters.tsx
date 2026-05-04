import { SearchIcon } from '@/assets/icons'
import { Input, Select } from '@/components/ui'
import { useQueryParams } from '@/hooks/useUrlFilters'
import { cn } from '@/lib/utils.clsx'
import { type ComponentProps } from 'react'
import { STATUS_SELECT_OPTIONS } from '../configs'
import { boxSolutionsParamsSchema } from '../types'

export const QueryFilters = ({ className, ...props }: ComponentProps<'div'>) => {
  const { params, updateParam, updateParamDebounced } = useQueryParams(boxSolutionsParamsSchema)

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
          onChange={updateParamDebounced('search')}
          className="grow min-w-86 w-full bg-white text-text"
        />
      </div>
      <div className="flex flex-col">
        <Select
          options={STATUS_SELECT_OPTIONS.options}
          placeholder={STATUS_SELECT_OPTIONS.placeholder}
          classNames={STATUS_SELECT_OPTIONS.classNames}
          defaultValue={params.status ?? STATUS_SELECT_OPTIONS.options[0].value}
          onValueChange={updateParam('status')}
        />
      </div>
    </div>
  )
}
