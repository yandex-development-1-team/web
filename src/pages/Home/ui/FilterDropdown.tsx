import { useState, useRef, useEffect } from 'react'
import { ArrowIcon } from '@/assets/icons'
import type { FilterDropdownProps } from '../types'

const options = [
  { value: 'all', label: 'Все заявки' },
  { value: 'queue', label: 'Новые заявки' },
  { value: 'progress', label: 'Заявки в работе' },
  { value: 'done', label: 'Готово' }
]

const FilterDropdown: React.FC<FilterDropdownProps> = ({ className, onChange, value }) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selected = options.find(option => option.value === value)

  const handleSelect = (val: string) => {
    onChange(val)
    setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="relative w-fit">
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className={`relative w-auto  text-left text-xs ${className}`}
      >
        {selected?.label}

        <div className="pointer-events-none absolute right-[8px] top-1/2 -translate-y-1/2">
          <ArrowIcon width={32} height={32} color="text-text-grey-light" />
        </div>
      </button>

      {open && (
        <ul className="absolute top-full left-0 mt-[4px] w-full bg-white border border-grey-light rounded-[8px] z-50">
          {options.map(option => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-[12px] py-[8px] cursor-pointer hover:bg-grey-light"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FilterDropdown
