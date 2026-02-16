import mockPhoto from './mock_photo.jpg'

type MockManagerData = {
  role: 'manager'
  name: string
  photo: string
  grade: number
}

type MockAdminData = {
  role: 'admin'
  name: string
  photo: string
}

export type MockUserData = MockManagerData | MockAdminData

export const MOCK_MANAGER: MockManagerData = {
  role: 'manager',
  name: 'Анастасия',
  photo: mockPhoto,
  grade: 2
}

export const MOCK_ADMIN: MockAdminData = {
  role: 'admin',
  name: 'Анастасия',
  photo: mockPhoto
}
