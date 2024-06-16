import { CardWrapper } from '@/components/auth/card-wrapper'
import LoginForm from '@/components/auth/login-form'

export const metadata = () => ({
  title: 'Login',
  description:
    'Welcome back to Kanjigami! Log in to continue your journey in mastering Japanese kanji through engaging games and interactive lessons. Access your personalized learning path, track your progress, and connect with the Kanjigami community. Sign in now and keep advancing your kanji skills!'
})

export default function LoginPage() {
  return (
    <CardWrapper headerLabel="Login" backButtonLabel="Don't have an account?" backButtonHref="/register" showSocial>
      <LoginForm />
    </CardWrapper>
  )
}
