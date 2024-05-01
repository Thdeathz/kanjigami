import NavbarContent from '@/components/layout/navbar/navbar-content'
import { auth } from '@/server/auth'

export default async function Navbar() {
  const session = await auth()

  return <NavbarContent session={session} />
}
