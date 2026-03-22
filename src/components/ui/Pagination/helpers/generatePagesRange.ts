export const generatePagesRange = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages: (number | string)[] = [1]

  let start = Math.max(2, currentPage - 1)
  let end = Math.min(totalPages - 1, currentPage + 1)

  if (currentPage <= 4) {
    end = 5
  }

  if (currentPage >= totalPages - 3) {
    start = totalPages - 4
  }

  if (start > 2) {
    pages.push('...')
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (end < totalPages - 1) {
    pages.push('...')
  }

  pages.push(totalPages)

  return pages
}
