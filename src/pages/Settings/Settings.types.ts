export interface IAccount {
  id: number
  name: string
  description: string
}

export interface IAccessRightsGroup {
  id: number
  name: string
}

export interface IAccessRight {
  id: number
  groupId: number
  name: string
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
