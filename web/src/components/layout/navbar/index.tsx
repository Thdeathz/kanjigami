import Breadcrumb from '@/components/layout/navbar/breadcrumb'
import NotificationButton from '@/components/layout/navbar/notification-button'
import RankWidget from '@/components/layout/navbar/rank-widget'
import ThemeButton from '@/components/layout/navbar/theme-button'
import UserButton from '@/components/layout/navbar/user-button'
import { auth } from '@/server/auth'

export default async function Navbar() {
  const session = await auth()

  return (
    <nav className="sticky top-0 z-50 flex h-[60px] w-full items-center justify-end bg-navbar px-4 py-3 backdrop-blur-[20px]">
      <div className="w-full">
        <Breadcrumb />
      </div>

      <RankWidget />

      <div className="flex w-full items-center justify-end gap-4">
        <ThemeButton />

        <NotificationButton />

        <UserButton user={session?.user} />
      </div>
    </nav>
  )
}
