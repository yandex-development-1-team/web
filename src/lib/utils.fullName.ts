export const getFullName = ({
  firstName,
  lastName,
  middleName
}: {
  firstName: string
  lastName: string
  middleName?: string
}) => {
  return [lastName, firstName, middleName].filter(Boolean).join(' ')
}
