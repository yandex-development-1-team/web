import type { TRoleServerId } from '@/services/api/accessSettings'

export interface IAccount {
  id: number
  name: string
  description: string
  serverName: TRoleServerId
}

export interface IAccessRightsGroup {
  id: number
  name: string
}

export interface IAccessRight {
  id: number
  groupId: number
  name: string
  serverName: string
}

export interface ITextFieldValue {
  id: number
  value: string
}

interface IAccessRightValue {
  id: number
  value: boolean
}

export interface IAccountAccessRight {
  accountId: number
  accessRights: IAccessRightValue[]
}
