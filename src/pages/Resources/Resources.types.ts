import type { LinkWithId } from './ui/Form/Form.types'

export type ResourcesData = {
  organizationInfo: string
  usefulLinks: LinkWithId[]
  faq: LinkWithId[]
  eventSchedule: LinkWithId[]
}

export type LinkBlockKey = keyof Omit<ResourcesData, 'organizationInfo'>

export interface IResourcesResponseData {
  slug: string
  title: string
  content: string
  links: LinkWithId[]
  updated_at: string
}
