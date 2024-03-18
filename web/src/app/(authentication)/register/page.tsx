import { CardWrapper } from '@/components/auth/card-wrapper'
import RegisterForm from '@/components/auth/register-form'

export default function RegisterPage() {
  return (
    <CardWrapper headerLabel="Register" backButtonLabel="Already have an account?" backButtonHref="/login">
      <RegisterForm />
    </CardWrapper>
  )
}
