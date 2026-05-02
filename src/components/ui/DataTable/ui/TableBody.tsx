import { CheckIcon } from '@/assets/icons'
import type { Column } from '../DataTable.types'
import { findMaxNumber, isValidNumber } from '../helpers'
import { PaddedNumber } from './PaddedNumber'

type Props<T> = {
  data: T[]
  columns: Column<T>[]
  idKey: keyof T
  enableCheckboxes?: boolean
  enableRowActions?: boolean
  selectedRows: T[]
  onRowClick?: (data: T) => void
  onSelectRow: (row: T) => void
  rowActions?: (row: T) => React.ReactNode
}

export function TableBody<T>({
  data,
  columns,
  idKey,
  enableCheckboxes,
  enableRowActions,
  selectedRows,
  onSelectRow,
  rowActions,
  onRowClick
}: Props<T>) {
  const maxLen = findMaxNumber(data, columns)

  return (
    <tbody>
      {data.map(row => {
        const isSelected = selectedRows.some(r => String(r[idKey]) === String(row[idKey]))
        return (
          <tr
            key={String(row[idKey])}
            className={`
              ${isSelected ? 'bg-creamy' : ''} border-b whitespace-nowrap border-b-grey-blue-light last:border-b-0
              transition-colors duration-300 hover:cursor-pointer hover:bg-grey-extra-light
            `}
            onClick={() => onRowClick?.(row)}
          >
            {enableCheckboxes && (
              <td className="w-12 p-4">
                <label className="flex cursor-pointer items-center justify-center" onClick={e => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSelectRow(row)}
                    className="peer sr-only"
                  />

                  <div
                    className="
                      h-5 w-5 rounded border-2 border-grey-dark bg-white
                      flex items-center justify-center text-white
                      peer-checked:bg-black peer-checked:border-black
                      relative
                    "
                  >
                    <CheckIcon className="absolute" />
                  </div>
                </label>
              </td>
            )}

            {columns.map(col => {
              console.log(col.key)

              return (
                <td key={col.key as string} className={`px-4 py-1 h-[52px] ${col.className || ''}`}>
                  {col.render ? (
                    col.render(row[col.key], row)
                  ) : isValidNumber(row[col.key]) ? (
                    <PaddedNumber maxLen={maxLen || 0} value={+row[col.key]} />
                  ) : (
                    String(row[col.key] ?? '')
                  )}
                </td>
              )
            })}

            {enableRowActions && (
              <td className="w-24 p-4">
                <div className="flex justify-center gap-4 text-grey-dark">{rowActions?.(row)}</div>
              </td>
            )}
          </tr>
        )
      })}
    </tbody>
  )
}
