import { Suspense } from 'react'

import { CardWrapper } from '@/components/auth/card-wrapper'
import ResetPasswordForm from '@/components/auth/reset-password-form'

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p className="text-center text-destructive">Reset password token not found</p>}>
      <CardWrapper headerLabel="Reset password" backButtonLabel="Back to login" backButtonHref="/login">
        <ResetPasswordForm />
      </CardWrapper>
    </Suspense>
  )
}
