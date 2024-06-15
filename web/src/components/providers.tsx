'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { GlobalContextProvider } from '@/contexts/global-context'
import useIsOnline from '@/hooks/use-is-online'

import { Button } from './ui/button'

export function OnlineContentProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isOnline } = useIsOnline()

  if (!isOnline && pathname !== '/' && pathname !== '/downloads')
    return (
      <div className="flex-center min-h-content p-12">
        <div className="mx-auto h-full max-w-[1600px]">
          <div className="space-y-4 text-center">
            <p className="font-secondary text-lg font-medium leading-10">
              The device has no network connection
              <br />
              Please check your network connection or see the stacks you have downloaded.
            </p>

            <Button link="/downloads">Go to downloads page</Button>
          </div>
        </div>
      </div>
    )

  return children
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 15, // 15 minutes
            refetchOnWindowFocus: true,
            refetchInterval: 60 * 1000 * 10, // 10 minute
            refetchOnMount: false
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
