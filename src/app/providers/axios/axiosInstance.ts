import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

const axiosConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_TARGET || '/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
}
export const api = axios.create(axiosConfig)
export const refreshApi = axios.create(axiosConfig)
