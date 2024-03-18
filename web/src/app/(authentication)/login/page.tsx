import { CardWrapper } from '@/components/auth/card-wrapper'
import LoginForm from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <CardWrapper headerLabel="Login" backButtonLabel="Don't have an account?" backButtonHref="/register" showSocial>
      <LoginForm />
    </CardWrapper>
  )
}
