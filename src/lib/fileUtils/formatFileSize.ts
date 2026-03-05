export const formatFileSize = (bites: number): string => {
  if (bites === 0) return '0 B'
  const k = 1024
  const size = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bites) / Math.log(k))
  return parseFloat((bites / Math.pow(k, i)).toFixed(1)) + ' ' + size[i]
}
