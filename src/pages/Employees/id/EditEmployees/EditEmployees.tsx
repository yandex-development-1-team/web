import { useNavigate, useParams } from 'react-router-dom'
import { Loader } from '@/components/ui'
import { EmployeeForm } from '../../ui'
import { useNotification } from '@/app/providers/notification'
import { useEmployee } from '../../hooks/useEmployee'
import { useUpdateEmployee } from '../../hooks/useUpdateEmployee'
import { fileToBase64 } from '@/lib/fileUtils/fileToBase64'
import { employeeToFormData, formDataToUpdateEmployee } from '../../helpers'
import type { EmployeeFormData } from '../../schema'

const EditEmployees = () => {
  const { employeeId } = useParams<{ employeeId: string }>() as { employeeId: string }
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const queryKey = ['employee', employeeId]
  const { employee, isPending, error } = useEmployee(employeeId, queryKey)
  const { mutateAsync: updateEmployee, isPending: isUpdating } = useUpdateEmployee(employeeId)

  const handleSubmit = async (data: EmployeeFormData, hasNewImage: boolean) => {
    try {
      let imageBase64: string | undefined = undefined

      if (hasNewImage && data.photo) {
        imageBase64 = await fileToBase64(data.photo)
      } else if (employee?.avatar) {
        imageBase64 = employee.avatar
      }

      const updatedData = formDataToUpdateEmployee(data, imageBase64, employee)
      await updateEmployee(updatedData)

      showNotification({ message: 'Данные обновлены', status: 'success' })
      navigate(`/employees/${employeeId}`)
    } catch {
      showNotification({ message: 'Ошибка при обновлении', status: 'error' })
    }
  }

  if (error) return <div className="text-h4 text-text-grey-dark">Ошибка при получении данных</div>
  if (isPending || isUpdating) return <Loader />
  if (!employee) return <div className="text-h4 text-text-grey-dark">Сотрудник не найден</div>

  const initialData = employeeToFormData(employee)

  return (
    <EmployeeForm
      title="Редактировать сотрудника"
      initialData={initialData}
      initialPreview={employee.avatar}
      onSubmit={handleSubmit}
      onCancel={() => navigate(`/employees/${employeeId}`)}
    />
  )
}

export const Component = EditEmployees
