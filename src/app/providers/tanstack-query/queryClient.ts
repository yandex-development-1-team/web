import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      
      retry: (failureCount, error: any) => {
        if (error?.status >= 400 && error?.status < 500) {
           if (error.status === 408 || error.status === 429) return failureCount < 1
           return false
        }
        return failureCount < 1
      },
      
      refetchOnReconnect: true,
      refetchOnWindowFocus: false, 
    },
    mutations: {
      retry: false, 
    }
  }
})
