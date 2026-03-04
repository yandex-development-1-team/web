import type { SortConfig } from './DataTable.types'

export function sortData<T>(data: T[], sortConfig: SortConfig<T> | null): T[] {
  if (!sortConfig) return data

  const { key, direction } = sortConfig

  return [...data].sort((a, b) => {
    const valA = a[key]
    const valB = b[key]

    if (valA == null && valB == null) return 0
    if (valA == null) return direction === 'asc' ? 1 : -1
    if (valB == null) return direction === 'asc' ? -1 : 1

    if (typeof valA === 'string' && typeof valB === 'string') {
      return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA)
    }

    if (typeof valA === 'number' && typeof valB === 'number') {
      return direction === 'asc' ? valA - valB : valB - valA
    }

    if (valA < valB) return direction === 'asc' ? -1 : 1
    if (valA > valB) return direction === 'asc' ? 1 : -1
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
    const newSelected = [...selected]
    rows.forEach(row => {
      if (!newSelected.some(s => String(s[idKey]) === String(row[idKey]))) {
        newSelected.push(row)
      }
    })
    return newSelected
  } else {
    return selected.filter(s => !rows.some(r => String(r[idKey]) === String(s[idKey])))
  }
}

export function PaginationLogic(currentPage: number, totalPages: number, maxWindow = 2): (number | '...')[] {
  const pages: (number | '...')[] = []

  if (totalPages <= maxWindow) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
    return pages
  }

  pages.push(1)

  const half = Math.floor(maxWindow / 2)

  let start = currentPage - half
  let end = start + maxWindow - 1

  if (start < 2) {
    start = 2
    end = start + maxWindow - 1
  }

  if (end > totalPages - 1) {
    end = totalPages - 1
    start = end - maxWindow + 1
  }

  if (start > 2) pages.push('...')

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (end < totalPages - 1) pages.push('...')

  pages.push(totalPages)

  return pages
}
