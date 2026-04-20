import type { CreateEmployeeData, EmployeeForTable, IEmployee } from './employees.types'
import type { EmployeeFormData } from './schema'

export const formDataToCreateEmployee = (data: EmployeeFormData, imageBase64?: string): CreateEmployeeData => {
  return {
    ...(imageBase64 && { avatar: imageBase64 }),
    personal_info: {
      first_name: data.personalInfo.firstName,
      last_name: data.personalInfo.surname,
      middle_name: data.personalInfo.patronymic
    },
    contacts: {
      phone: data.contactInfo.phone,
      email: data.contactInfo.email,
      city: data.contactInfo.city
    },
    job_info: {
      department: data.jobInfo.department,
      position: data.jobInfo.position,
      role: data.accessLevel.roleId === 0 ? 'Администратор' : `Менеджер ${data.accessLevel.roleId} звена`,
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
      middle_name: data.personalInfo.patronymic
    },
    contacts: {
      phone: data.contactInfo.phone,
      email: data.contactInfo.email,
      city: data.contactInfo.city
    },
    job_info: {
      department: data.jobInfo.department,
      position: data.jobInfo.position,
      role: data.accessLevel.roleId === 0 ? 'Администратор' : `Менеджер ${data.accessLevel.roleId} звена`,
      chief: data.jobInfo.chief
    },
    access_level: 'Ограниченный доступ',
    status: existingEmployee?.status || 'active',
    updated_at: now
  }
}

const parseRoleFromString = (role: string): number | null => {
  if (role === 'Администратор') return 0
  const match = role.match(/Менеджер (\d+) звена/)
  return match ? parseInt(match[1]) : null
}

// Преобразование IEmployee в EmployeeFormData (для редактирования)
export const employeeToFormData = (employee: IEmployee): EmployeeFormData => {
  return {
    photo: null,
    personalInfo: {
      surname: employee.personal_info.last_name,
      firstName: employee.personal_info.first_name,
      patronymic: employee.personal_info.middle_name || ''
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
      roleId: parseRoleFromString(employee.job_info.role)
    }
  }
}

// Преобразование IEmployee в Employee (для таблицы)
export const employeeToTableFormat = (employee: IEmployee): EmployeeForTable => {
  return {
    id: employee.id,
    name: `${employee.personal_info.last_name} ${employee.personal_info.first_name}`,
    department: employee.job_info.department,
    chief: employee.job_info.chief,
    position: employee.job_info.position,
    level: employee.job_info.role === 'Администратор' ? 'A' : employee.job_info.role.match(/\d+/)?.[0] || '1',
    phone: employee.contacts.phone,
    email: employee.contacts.email,
    city: employee.contacts.city
  }
}
