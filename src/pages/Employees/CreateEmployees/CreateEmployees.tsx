import { useNavigate } from 'react-router-dom'
import { EmployeeForm } from '../ui'
import { useCreateEmployee } from '../hooks/useCreateEmployee'
import { useNotification } from '@/app/providers/notification'
import { fileToBase64 } from '@/lib/fileUtils/fileToBase64'
import { formDataToCreateEmployee } from '../helpers'
import type { EmployeeFormData } from '../schema'

const CreateEmployees = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const { mutateAsync: createEmployeeMutation } = useCreateEmployee()

  const handleSubmit = async (data: EmployeeFormData, hasNewImage: boolean) => {
    try {
      let imageBase64: string | undefined = undefined

      if (hasNewImage && data.photo) {
        imageBase64 = await fileToBase64(data.photo)
      }

      const employeeData = formDataToCreateEmployee(data, imageBase64)
      const newEmployee = await createEmployeeMutation(employeeData)

      showNotification({ message: 'Сотрудник добавлен', status: 'success' })
      navigate(`/employees/${newEmployee.id}`)
    } catch {
      showNotification({ message: 'Ошибка при создании', status: 'error' })
    }
  }

  return <EmployeeForm title="Добавить сотрудника" onSubmit={handleSubmit} onCancel={() => navigate(-1)} />
}

export const Component = CreateEmployees
