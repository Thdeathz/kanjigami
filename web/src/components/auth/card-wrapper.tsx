'use client'

import React from 'react'

import { BackButton } from '@/components/auth/back-button'
import { Header } from '@/components/auth/header'
import { Social } from '@/components/auth/social'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial = false
}: CardWrapperProps) => {
  return (
    <Card className="w-[28rem]">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>

      <CardContent>{children}</CardContent>

      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}

      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}
