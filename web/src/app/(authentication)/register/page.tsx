import { CardWrapper } from '@/components/auth/card-wrapper'
import RegisterForm from '@/components/auth/register-form'

export const metadata = () => ({
  title: 'Register',
  description:
    'Join Kanjigami today! Register now to start your adventure in learning Japanese kanji through fun, interactive games and comprehensive lessons. Perfect for all skill levels, Kanjigami offers customizable learning paths, community support, and engaging challenges. Sign up and begin your kanji journey!'
})

export default function RegisterPage() {
  return (
    <CardWrapper headerLabel="Register" backButtonLabel="Already have an account?" backButtonHref="/login">
      <RegisterForm />
    </CardWrapper>
  )
}
