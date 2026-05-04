import { useNavigate } from 'react-router-dom'
import { useCreateUser } from '../api/userQueries'
import { formDataToUserUpdatePayload } from '../helpers'
import type { EmployeeFormData } from '../schema'
import { EmployeeForm } from '../ui'

const CreateEmployees = () => {
  const navigate = useNavigate()
  const { mutate: createUserMutation } = useCreateUser()

  const handleSubmit = async (formData: EmployeeFormData) => {
    const userUpdatePayload = await formDataToUserUpdatePayload(formData, formData.photo)

    createUserMutation(userUpdatePayload)
  }

  return <EmployeeForm title="Добавить сотрудника" onSubmit={handleSubmit} onCancel={() => navigate(-1)} />
}

export const Component = CreateEmployees
