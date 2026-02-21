export type LinkFormFields = {
  title: string
  url: string
}

export type LinkFormType = {
  links: LinkFormFields[]
  onAddLink: (data: LinkFormFields) => void
  onRemoveLink: (index: number) => void
}

export type InfoFormData = {
  info: string
}

export type InfoFormType = {
  defaultValue?: string
  onSaveInfo: (data: InfoFormData) => void
  onDeleteInfo: () => void
}
