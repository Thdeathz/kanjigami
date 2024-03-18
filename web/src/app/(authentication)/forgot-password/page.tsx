import { CardWrapper } from '@/components/auth/card-wrapper'
import ForgotPasswordForm from '@/components/auth/forgot-password-form'

export default function ForgotPassword() {
  return (
    <CardWrapper headerLabel="Forgot password" backButtonLabel="Back to login" backButtonHref="/login">
      <ForgotPasswordForm />
    </CardWrapper>
  )
}
