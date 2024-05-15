import { CardWrapper } from '@/components/auth/card-wrapper'
import LoginForm from '@/components/auth/login-form'

export const metadata = () => ({
  title: 'Login',
  description: 'Login to the 漢字ガミ app to start learning kanji through games.'
})

export default function LoginPage() {
  return (
    <CardWrapper headerLabel="Login" backButtonLabel="Don't have an account?" backButtonHref="/register" showSocial>
      <LoginForm />
    </CardWrapper>
  )
}
