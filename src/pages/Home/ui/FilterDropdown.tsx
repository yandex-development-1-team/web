import { useState } from 'react'
import { ArrowIcon } from '@/assets/icons'

interface FilterDropdownProps {
  className?: string
  onChange: (value: string) => void
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ className, onChange }) => {
  const [status, setStatus] = useState('all')

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setStatus(value)
    onChange(value)
  }

  return (
    <div className="relative  w-fit ">
      <select value={status} onChange={handleChange} className={`appearance-none w-full block  pr-[40px] ${className}`}>
        <option value="all">Все заявки</option>
        <option value="queue">Новые заявки</option>
        <option value="progress">Заявки в работе</option>
        <option value="done">Готово</option>
      </select>

      <div className="pointer-events-none absolute right-[8px] top-1/2 -translate-y-1/2 z-10">
        <ArrowIcon width={32} height={32} color="text-text-grey-light" />
      </div>
    </div>
  )
}

export default FilterDropdown
