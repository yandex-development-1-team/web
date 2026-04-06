import { ArrowIcon, ArrowsSeparateVerticalIcon } from '@/assets/icons'
import { CheckIcon } from '@/assets/icons'
import type { ChangeEvent } from 'react'
import type { Column } from '../DataTable.types'

type Props<T> = {
  columns: Column<T>[]
  enableCheckboxes?: boolean
  enableRowActions?: boolean
  onSort?: (key: keyof T) => void
  onSelectAll?: (e: ChangeEvent<HTMLInputElement>) => void
  direction: 'asc' | 'desc' | null
}

export function TableHeader<T>({
  columns,
  enableCheckboxes,
  enableRowActions,
  onSort,
  onSelectAll,
  direction
}: Props<T>) {
  return (
    <thead>
      <tr className="border-b border-grey-light h-12 bg-grey-extra-light text-color-black">
        {enableCheckboxes && (
          <th className="w-12">
            <label className="inline-flex cursor-pointer items-center justify-center">
              <input type="checkbox" onChange={onSelectAll} className="peer sr-only" />

              <div
                className="
                  h-5 w-5 rounded border-2 border-grey-dark bg-white
                  flex items-center justify-center text-white relative top-1
                  peer-checked:bg-black peer-checked:border-black
                  peer-indeterminate:bg-black peer-indeterminate:border-black
                "
              >
                <CheckIcon className="absolute" />
              </div>
            </label>
          </th>
        )}

        {columns.map(col => (
          <th
            key={col.key as string}
            onClick={col.sortable ? () => onSort?.(col.key) : undefined}
            className={`px-4 py-1 h-[54px] text-left text-black ${col.sortable ? 'cursor-pointer' : ''}`}
          >
            <div className="flex items-center gap-1">
              <span>{col.label}</span>
              {col.sortable && (
                <>
                  {direction === null ? (
                    <ArrowsSeparateVerticalIcon className="h-4 w-4" />
                  ) : direction === 'asc' ? (
                    <ArrowIcon className="w-4 h-4 rotate-180 stroke-2" />
                  ) : (
                    <ArrowIcon className="w-4 h-4 rotate-0  stroke-2" />
                  )}
                </>
              )}
            </div>
          </th>
        ))}

        {enableRowActions && <th />}
      </tr>
    </thead>
  )
}
