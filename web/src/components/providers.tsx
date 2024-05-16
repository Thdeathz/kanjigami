'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { useState } from 'react'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { GlobalContextProvider } from '@/contexts/global-context'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 15, // 15 minutes
            refetchOnWindowFocus: true,
            refetchInterval: 60 * 1000 * 10 // 10 minute
          }
        }
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />

      <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
        <GlobalContextProvider>{children}</GlobalContextProvider>
        <Toaster position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
