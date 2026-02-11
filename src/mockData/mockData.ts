import mockPhoto from './mock_photo.jpg'

export interface MockUserDataProps {
  role: 'manager' | 'admin'
  name: string
  photo: string
  grade?: number
}

export const MOCK_MANAGER: MockUserDataProps = {
  role: 'manager',
  name: 'Анастасия',
  photo: mockPhoto,
  grade: 2
}

export const MOCK_ADMIN: MockUserDataProps = {
  role: 'admin',
  name: 'Анастасия',
  photo: mockPhoto
}
