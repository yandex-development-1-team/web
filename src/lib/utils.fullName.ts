type TPersonalInfo = {
  last_name: string
  first_name: string
  middle_name?: string
}

export const getFullName = (personalInfo: TPersonalInfo) => {
  const { last_name, first_name, middle_name } = personalInfo
  return [last_name, first_name, middle_name].filter(Boolean).join(' ')
}
