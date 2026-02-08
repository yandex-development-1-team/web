// 1. Экспортируем основной инстанс для выполнения запросов
export { api } from './axiosInstance'

// 2. Экспортируем React-провайдер для инициализации в роутере/приложении
export { AxiosProvider } from './AxiosProvider'

// 3. Экспортируем кастомные классы ошибок (чтобы проверять их в catch через instanceof)
export { ApiError, NetworkError, CancelledRequestError } from './utils/customErrors'

// 4. Экспортируем типы данных (если они понадобятся в сервисах)
export type { ApiErrorData, TokenStorage } from './types/api'
