import type { Column } from './DataTable.types'

interface SkeletonRowProps<T> {
  columns: Column<T>[]
  enableCheckboxes: boolean
  enableRowActions: boolean
}

export function SkeletonRow<T>({ columns, enableCheckboxes, enableRowActions }: SkeletonRowProps<T>) {
  return (
    <tr className="border-t border-grey-light">
      {enableCheckboxes && (
        <td className="p-4">
          <div className="h-4 w-4 bg-grey-light" />
        </td>
      )}
      {columns.map((col, index) => (
        <td key={index} className={`p-4 ${col.className || ''}`}>
          <div className="h-4 bg-grey-light" />
        </td>
      ))}
      {enableRowActions && (
        <td className="p-4 flex justify-center gap-3">
          <div className="h-4 w-4 bg-grey-light" />
          <div className="h-4 w-4 bg-grey-light" />
        </td>
      )}
    </tr>
  )
}
