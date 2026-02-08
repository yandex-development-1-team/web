import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

// создаем экземпляр axios с базовыми настройками
// все запросы через api будут использовать эти параметры
const axiosConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
}

export const api = axios.create(axiosConfig)
