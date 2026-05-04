export type SelectType = {
  options: {
    value: string
    label: string
  }[]
  placeholder: string
  classNames?: {
    trigger?: string
    value?: string
    content?: string
    item?: string
  }
}
