import type { LinkFormFields } from './ui/Form/Form.types'

export type ResourcesData = {
  organizationInfo: string
  usefulLinks: LinkFormFields[]
  faq: LinkFormFields[]
  eventSchedule: LinkFormFields[]
}

export type LinkBlockKey = keyof Omit<ResourcesData, 'organizationInfo'>
