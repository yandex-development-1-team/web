import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient'
import type { ReactNode } from 'react'

interface IQueryProviderProps {
  children: ReactNode
}

export const QueryProvider = ({ children }: IQueryProviderProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
