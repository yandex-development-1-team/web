import { Check } from '@/assets/icons'
import type { Column } from '../DataTable.types'

type Props<T> = {
  data: T[]
  columns: Column<T>[]
  idKey: keyof T
  enableCheckboxes?: boolean
  enableRowActions?: boolean
  selectedRows: T[]
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
  rowActions
}: Props<T>) {
  return (
    <tbody>
      {data.map(row => {
        const isSelected = selectedRows.some(r => String(r[idKey]) === String(row[idKey]))
        return (
          <tr key={String(row[idKey])} className={`${isSelected ? 'bg-[#FFFFF8]' : ''}`}>
            {enableCheckboxes && (
              <td className="w-12 p-4">
                <label className="flex cursor-pointer items-center justify-center">
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
                    <Check className="absolute" />
                  </div>
                </label>
              </td>
            )}

            {columns.map(col => (
              <td key={col.key as string} className={`p-4 ${col.className || ''}`}>
                {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
              </td>
            ))}

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
