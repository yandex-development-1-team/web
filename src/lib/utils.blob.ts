export function downloadBlob(blob: Blob, fileName?: string): void {
  const url = window.URL.createObjectURL(blob)
  const name = fileName || url.split('/').pop()
  const link = document.createElement('a')
  link.href = url
  link.download = `${name}`
  link.click()
  window.URL.revokeObjectURL(url)
}
