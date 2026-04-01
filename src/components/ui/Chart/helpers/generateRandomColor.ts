export const generateRandomColor = (index: number, presetColors?: string[]) => {
  const defaultColors = ['#194F8D', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec489a']

  const colors = presetColors || defaultColors

  if (index < colors.length) {
    return colors[index]
  }

  const hue = Math.random() * 360
  return `hsl(${hue}, 70%, 55%)`
}
