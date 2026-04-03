export const PaddedNumber = ({ value, maxLen }: { value: number | string; maxLen: number }) => {
  const str = String(value).trim()
  const spacesCount = Math.max(0, maxLen - str.length)

  const padding = '\u2007'.repeat(spacesCount)

  return (
    <div style={{ whiteSpace: 'pre' }}>
      {padding}
      {str}
    </div>
  )
}
