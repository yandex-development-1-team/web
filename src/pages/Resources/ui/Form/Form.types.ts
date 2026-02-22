export type LinkFormFields = {
  title: string
  url: string
}

export type LinkWithId = LinkFormFields & {
  id: string
}

export type LinkFormType = {
  links: LinkWithId[]
  onAddLink: (data: LinkFormFields) => void
  onRemoveLink: (id: string) => void
}

export type InfoFormData = {
  info: string
}

export type InfoFormType = {
  defaultValue?: string
  onSaveInfo: (data: InfoFormData) => void
  onDeleteInfo: () => void
}
