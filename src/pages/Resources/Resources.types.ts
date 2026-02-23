import type { LinkWithId } from './ui/Form/Form.types'

export type ResourcesData = {
  organizationInfo: string
  usefulLinks: LinkWithId[]
  faq: LinkWithId[]
  eventSchedule: LinkWithId[]
}

export type LinkBlockKey = keyof Omit<ResourcesData, 'organizationInfo'>
