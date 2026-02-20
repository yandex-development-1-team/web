import type { SortConfig } from './DataTable.types'

export function sortData<T>(data: T[], sortConfig: SortConfig | null): T[] {
  if (!sortConfig) return data
  return [...data].sort((a, b) => {
    const valA = a[sortConfig.key as keyof T]
    const valB = b[sortConfig.key as keyof T]
    if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1
    if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })
}

export function paginateData<T>(data: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize
  return data.slice(start, start + pageSize)
}

export function toggleRowSelection<T>(selected: T[], row: T, idKey: keyof T): T[] {
  const id = row[idKey]
  const exists = selected.some(r => r[idKey] === id)
  return exists ? selected.filter(r => r[idKey] !== id) : [...selected, row]
}

export function toggleAllSelection<T>(selected: T[], rows: T[], idKey: keyof T, allSelected: boolean): T[] {
  if (allSelected) {
    return selected.filter(s => !rows.some(r => r[idKey] === s[idKey]))
  }
  const newSelected = [...selected]
  rows.forEach(row => {
    if (!newSelected.some(s => s[idKey] === row[idKey])) {
      newSelected.push(row)
    }
  })
  return newSelected
}
