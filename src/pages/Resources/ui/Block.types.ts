export type FormFields = {
  title: string
  url: string
}

export type BlockType = {
  title: string
  links: FormFields[]
  onAddLink: (data: FormFields) => void
  onRemoveLink: (index: number) => void
}
