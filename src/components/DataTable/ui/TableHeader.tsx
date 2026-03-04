import { ArrowsSeparateVerticalIcon } from '@/assets/icons'
import { Check } from '@/assets/icons'
import type { ChangeEvent, RefObject } from 'react'
import type { Column } from '../DataTable.types'

type Props<T> = {
  columns: Column<T>[]
  enableCheckboxes?: boolean
  enableRowActions?: boolean
  onSort?: (key: keyof T) => void
  selectAllRef?: RefObject<HTMLInputElement | null>
  onSelectAll?: (e: ChangeEvent<HTMLInputElement>) => void
}

export function TableHeader<T>({
  columns,
  enableCheckboxes,
  enableRowActions,
  onSort,
  selectAllRef,
  onSelectAll
}: Props<T>) {
  return (
    <thead>
      <tr className="border-b border-grey-light h-12 bg-grey-extra-light text-color-black">
        {enableCheckboxes && (
          <th className="w-12">
            <label className="inline-flex cursor-pointer items-center justify-center">
              <input ref={selectAllRef} type="checkbox" onChange={onSelectAll} className="peer sr-only" />

              <div
                className="
                  h-5 w-5 rounded border-2 border-grey-dark bg-white
                  flex items-center justify-center text-white relative top-1
                  peer-checked:bg-black peer-checked:border-black
                  peer-indeterminate:bg-black peer-indeterminate:border-black
                "
              >
                <Check className="absolute" />
              </div>
            </label>
          </th>
        )}

        {columns.map(col => (
          <th
            key={col.key as string}
            onClick={col.sortable ? () => onSort?.(col.key) : undefined}
            className={`p-4 text-left text-black ${col.sortable ? 'cursor-pointer' : ''}`}
          >
            <div className="flex items-center gap-1">
              <span>{col.label}</span>
              {col.sortable && <ArrowsSeparateVerticalIcon className="h-4 w-4" />}
            </div>
          </th>
        ))}

        {enableRowActions && <th />}
      </tr>
    </thead>
  )
}
