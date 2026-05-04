import { SearchIcon } from '@/assets/icons'
import { Input, Select } from '@/components/ui'
import { filterSchema } from '../specialProjects.types'
import { useQueryParams } from '@/hooks/useUrlFilters'

const selectData = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'inactive', label: 'Не активные' }
]

export function FiltersBlock() {
  const { params, updateParam, updateParamDebounced } = useQueryParams(filterSchema)

  return (
    <div className="flex items-center gap-5 mb-6">
      <Input
        variant="icon"
        icon={<SearchIcon />}
        iconPosition="inline-start"
        className="bg-white min-[1440px]:min-w-84 h-full"
        placeholder=""
        defaultValue={params.search}
        onChange={updateParamDebounced('search')}
      />
      <Select
        defaultValue={params.status ?? selectData[0].value}
        options={selectData}
        placeholder="Выберите статус"
        classNames={{ trigger: 'bg-white w-full h-11.5' }}
        onValueChange={updateParam('status')}
      />
    </div>
  )
}
