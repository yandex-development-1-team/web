import { SearchIcon } from '@/assets/icons'
import { Input } from '@/components/ui'
import { cn } from '@/lib/utils.clsx'

import { useQueryParams } from '@/hooks/useUrlFilters'
import type { ComponentProps } from 'react'
import { employeesSearchParamsSchema } from '../schema'

export const QueryFilters = ({ className, ...props }: ComponentProps<'div'>) => {
  const { params, updateParamDebounced } = useQueryParams(employeesSearchParamsSchema)

  return (
    <div className={cn('flex gap-5', className)} {...props}>
      <Input
        placeholder="Имя клиента"
        variant="icon"
        icon={<SearchIcon />}
        iconPosition="inline-start"
        onClick={() => {}}
        defaultValue={params.search}
        onChange={updateParamDebounced('search')}
        className="grow min-w-86 w-full bg-white text-text"
      />
    </div>
  )
}
