import mockPhoto from './mock_photo.jpg'
import { PERMISSIONS } from '@/app/router/permissions'

type TUser = {
  role: string
  name: string
  photo: string
  permissions?: {
    items: string[]
  }
}

type MockManagerData = TUser & {
  role: 'manager'
  grade: number
}

type MockAdminData = TUser & {
  role: 'admin'
}

export type MockUserData = MockManagerData | MockAdminData

export const MOCK_MANAGER: MockManagerData = {
  role: 'manager',
  name: 'Анастасия',
  photo: mockPhoto,
  grade: 2,
  permissions: {
    items: [
      PERMISSIONS.applicationsView,
      PERMISSIONS.applicationsEdit,
      PERMISSIONS.applicationsDelete,
      PERMISSIONS.boxesCreate,
      PERMISSIONS.boxesEdit,
      PERMISSIONS.boxesDelete,
      PERMISSIONS.presentationsView,
      PERMISSIONS.presentationsEdit,
      PERMISSIONS.presentationsDelete,
      PERMISSIONS.specprojectsView,
      PERMISSIONS.specprojectsEdit,
      PERMISSIONS.specprojectsDelete,
      PERMISSIONS.analyticsView,
      PERMISSIONS.analyticsDownload,
      PERMISSIONS.affiche,
      PERMISSIONS.about,
      PERMISSIONS.faq
    ]
  }
}

export const MOCK_ADMIN: MockAdminData = {
  role: 'admin',
  name: 'Анастасия',
  photo: mockPhoto,
  permissions: {
    items: [
      PERMISSIONS.applicationsView,
      PERMISSIONS.applicationsEdit,
      PERMISSIONS.applicationsDelete,
      PERMISSIONS.boxesCreate,
      PERMISSIONS.boxesEdit,
      PERMISSIONS.boxesDelete,
      PERMISSIONS.presentationsView,
      PERMISSIONS.presentationsEdit,
      PERMISSIONS.presentationsDelete,
      PERMISSIONS.specprojectsView,
      PERMISSIONS.specprojectsEdit,
      PERMISSIONS.specprojectsDelete,
      PERMISSIONS.analyticsView,
      PERMISSIONS.analyticsDownload,
      PERMISSIONS.affiche,
      PERMISSIONS.about,
      PERMISSIONS.faq
    ]
  }
}

export const MOCK_USER = MOCK_MANAGER
