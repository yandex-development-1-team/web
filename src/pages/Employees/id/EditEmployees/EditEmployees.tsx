import { Loader } from '@/components/ui'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchUser, useUpdateUser } from '../../api/userQueries'
import { formDataToUserUpdatePayload, userWithDetailsToFormData } from '../../helpers'
import type { EmployeeFormData } from '../../schema'
import { EmployeeForm } from '../../ui'

const EditEmployees = () => {
  const { employeeId } = useParams<{ employeeId: string }>()
  const navigate = useNavigate()

  const { user, isPending, error } = useFetchUser(employeeId)

  const updateMutation = useUpdateUser(employeeId)

  const handleSubmit = async (formData: EmployeeFormData) => {
    const updatedData = await formDataToUserUpdatePayload(formData, formData.photo, user?.status || 'blocked')
    updateMutation.mutate(updatedData)
  }

  if (error) return <div className="text-h4 text-text-grey-dark">Ошибка при получении данных</div>
  if (isPending) return <Loader />
  if (!user) return <div className="text-h4 text-text-grey-dark">Сотрудник не найден</div>

  const initialData = userWithDetailsToFormData(user)

  return (
    <EmployeeForm
      isSubmiting={updateMutation.isPending}
      title="Редактировать сотрудника"
      initialData={initialData}
      initialPreview={user.image}
      onSubmit={handleSubmit}
      onCancel={() => navigate(`/employees/${employeeId}`)}
    />
  )
}

export const Component = EditEmployees
