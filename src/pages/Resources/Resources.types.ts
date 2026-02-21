import type { FormFields } from './ui/Block.types'

export type ResourcesData = {
  organizationInfo: string
  usefulLinks: FormFields[]
  faq: FormFields[]
  eventSchedule: FormFields[]
}

export type LinkBlockKey = keyof Omit<ResourcesData, 'organizationInfo'>
