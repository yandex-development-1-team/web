import type { UserCreateOrUpdateRequestDto, UserListItemResponseDto, UserWithDetailsResponseDto } from './api/types'
import { userApi } from './api/userApi'
import type { CreateEmployeeData, IEmployee, User, UserListItem, UserStatus, UserWithDetails } from './employees.types'
import type { EmployeeFormData } from './schema'

export const formDataToCreateEmployee = (data: EmployeeFormData, imageBase64?: string): CreateEmployeeData => {
  return {
    ...(imageBase64 && { avatar: imageBase64 }),
    personal_info: {
      first_name: data.personalInfo.firstName,
      last_name: data.personalInfo.surname,
      second_name: data.personalInfo.patronymic
    },
    contacts: {
      phone: data.contactInfo.phone,
      email: data.contactInfo.email,
      city: data.contactInfo.city
    },
    job_info: {
      department: data.jobInfo.department,
      position: data.jobInfo.position,
      role: data.accessLevel.role,
      chief: data.jobInfo.chief
    }
  }
}

export const formDataToUpdateEmployee = (
  data: EmployeeFormData,
  imageBase64?: string,
  existingEmployee?: IEmployee
): Partial<IEmployee> => {
  const now = new Date().toISOString()

  return {
    ...(imageBase64 && { avatar: imageBase64 }),
    personal_info: {
      first_name: data.personalInfo.firstName,
      last_name: data.personalInfo.surname,
      second_name: data.personalInfo.patronymic
    },
    contacts: {
      phone: data.contactInfo.phone,
      email: data.contactInfo.email,
      city: data.contactInfo.city
    },
    job_info: {
      department: data.jobInfo.department,
      position: data.jobInfo.position,
      role: data.accessLevel.role,
      chief: data.jobInfo.chief
    },
    status: existingEmployee?.status || 'active',
    updated_at: now
  }
}

export const formDataToUserUpdatePayload = async (
  data: EmployeeFormData,
  file: File | null,
  employeeStatus?: UserStatus,
  imageBase64?: string
): Promise<UserCreateOrUpdateRequestDto> => {
  void imageBase64

  let imageData = null

  if (file) {
    imageData = await userApi.getUserImage(file)
  }

  return {
    first_name: data.personalInfo.firstName,
    last_name: data.personalInfo.surname,
    second_name: data.personalInfo.patronymic,
    email: data.contactInfo.email,
    role: data.accessLevel.role,
    status: employeeStatus || 'blocked',
    phone_number: data.contactInfo.phone,
    department: data.jobInfo.department,
    position: data.jobInfo.position,
    supervisor: data.jobInfo.chief,
    address: data.contactInfo.city,
    image: imageData?.url
  }
}

export const employeeToFormData = (employee: IEmployee): EmployeeFormData => {
  return {
    photo: null,
    personalInfo: {
      surname: employee.personal_info.last_name,
      firstName: employee.personal_info.first_name,
      patronymic: employee.personal_info.second_name || ''
    },
    contactInfo: {
      phone: employee.contacts.phone,
      email: employee.contacts.email,
      city: employee.contacts.city
    },
    jobInfo: {
      department: employee.job_info.department,
      position: employee.job_info.position,
      chief: employee.job_info.chief
    },
    accessLevel: {
      role: employee.job_info.role
    }
  }
}

export const userWithDetailsToFormData = (employee: UserWithDetails): EmployeeFormData => {
  return {
    photo: null,
    personalInfo: {
      surname: employee.lastName || '-',
      firstName: employee.firstName || '-',
      patronymic: employee.secondName || '-'
    },
    contactInfo: {
      phone: employee.phoneNumber || '-',
      email: employee.email || '-',
      city: employee.address
    },
    jobInfo: {
      department: employee.department || '-',
      position: employee.position || '-',
      chief: employee.supervisor || '-'
    },
    accessLevel: {
      role: employee.role
    }
  }
}

export const mapUserToFormData = (user: User): EmployeeFormData => {
  return {
    photo: null,
    personalInfo: {
      surname: user.lastName || '',
      firstName: user.firstName || '',
      patronymic: user.secondName || ''
    },
    contactInfo: {
      phone: user.phoneNumber || '',
      email: user.email || '',
      city: user.address
    },
    jobInfo: {
      department: user.department || '',
      position: user.position || '',
      chief: user.supervisor
    },
    accessLevel: {
      role: user.role
    }
  }
}

export const mapUserDtoToUserListItem = (user: UserListItemResponseDto): UserListItem => {
  return {
    id: user.id,
    fullName: `${user.first_name} ${user.last_name}`,
    firstName: user.first_name,
    lastName: user.last_name,
    secondName: user.second_name,
    telegramNick: user.telegram_nick,
    department: user.department,
    supervisor: user.supervisor,
    position: user.position,
    role: user.role,
    phoneNumber: user.phone_number,
    email: user.email,
    createdAt: user.created_at,
    status: user.status
  }
}

export const mapUserListDtoToUserList = (users: UserListItemResponseDto[]): UserListItem[] => {
  return users.map(mapUserDtoToUserListItem)
}

export const mapUserWithDetailsDtoToUserWithDetails = (user: UserWithDetailsResponseDto): UserWithDetails => {
  return {
    id: user.id,
    telegramNick: user.telegram_nick,
    firstName: user.first_name,
    lastName: user.last_name,
    secondName: user.second_name,
    email: user.email,
    phoneNumber: user.phone_number,
    role: user.role,
    status: user.status,
    department: user.department,
    position: user.position,
    supervisor: user.supervisor,
    address: user.address,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    image: user.image,
    favoriteBoxes: user.favorite_boxes,
    bookings: user.bookings.map(booking => ({
      id: booking.id,
      eventId: booking.event_id,
      boxName: booking.box_name,
      date: booking.date,
      time: booking.time,
      status: booking.status
    })),
    visitHistory: user.visit_history.map(history => ({
      boxName: history.box_name,
      visitedAt: history.visited_at
    }))
  }
}
