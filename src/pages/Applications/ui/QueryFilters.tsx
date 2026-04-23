import { SearchIcon } from '@/assets/icons'
import { Input, Select } from '@/components/ui'
import { useUrlFilters } from '@/hooks/useUrlFilters'
import { cn } from '@/lib/utils.clsx'
import { type ComponentProps } from 'react'
import { applicationsParamsSchema } from '../applications.types'
import { statusSelectOptions } from '../configs/queryFilters.config'

export const QueryFilters = ({ className, ...props }: ComponentProps<'div'>) => {
  const { params, updateOnSelectParams, updateOnSearchParams } = useUrlFilters(applicationsParamsSchema)

  return (
    <div className={cn('flex gap-5', className)} {...props}>
      <div className="flex flex-col">
        <Input
          placeholder="имя клиента"
          variant="icon"
          icon={<SearchIcon />}
          iconPosition="inline-start"
          onClick={() => {}}
          defaultValue={params.customer_name}
          onChange={updateOnSearchParams('customer_name')}
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
