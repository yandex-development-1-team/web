export const validateLogin = (value: string) => {
  if (!value.trim()) return 'Логин обязателен'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Некорректный email'
  return ''
}

export const validatePassword = (value: string) => {
  if (!value) return 'Пароль обязателен'
  return ''
}
