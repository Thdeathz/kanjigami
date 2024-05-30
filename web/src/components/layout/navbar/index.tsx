import NavbarContent from '@/components/layout/navbar/navbar-content'
import { getCurrentUserInfo } from '@/server/actions/user'

export default async function Navbar() {
  const currentUser = await getCurrentUserInfo()

  return <NavbarContent currentUser={currentUser} />
}
