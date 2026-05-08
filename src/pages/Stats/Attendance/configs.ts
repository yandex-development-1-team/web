export const dashboard: {
  title: string
  value: number
  warningColor?: boolean | undefined
  largeValueSize?: boolean | undefined
}[] = [
  {
    title: 'Принятые заявки',
    value: 29,
    largeValueSize: true
  },
  { title: 'Реализованные', value: 25, largeValueSize: true },
  { title: 'Не реализованные', value: 4, largeValueSize: true, warningColor: true }
]
