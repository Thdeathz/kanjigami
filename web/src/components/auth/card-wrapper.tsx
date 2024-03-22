'use client'

import React from 'react'

import { BackButton } from '@/components/auth/back-button'
import { Social } from '@/components/auth/social'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

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
    <Card className="relative w-[30rem]">
      <h1 className="absolute top-[-4rem] w-full text-center text-[2rem] font-semibold text-default-heading">
        {headerLabel}
      </h1>

      <CardContent className="pb-0 pt-6">{children}</CardContent>

      <CardFooter className="flex-center flex-col">
        {showSocial && (
          <div className="w-full">
            <div className="flex-center gap-2 py-3.5 text-center text-sm font-medium">
              <Separator className="w-1/3" />
              <span>OR</span>
              <Separator className="w-1/3" />
            </div>
            <Social />
          </div>
        )}
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}
