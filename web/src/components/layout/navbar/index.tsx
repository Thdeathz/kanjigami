import Link from 'next/link'

import NotificationButton from '@/components/layout/navbar/notification-button'
import RankWidget from '@/components/layout/navbar/rank-widget'
import ThemeButton from '@/components/layout/navbar/theme-button'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  return (
    <nav className="sticky top-0 flex h-[60px] w-full items-center justify-end bg-navbar px-4 py-3 backdrop-blur-[20px]">
      <div className="w-full">{/* TODO: breadcrumb menu */}</div>

      <RankWidget />

      <div className="flex w-full items-center justify-end gap-4">
        <ThemeButton />

        <NotificationButton />

        <Link href="/login">
          <Button>Sign In / Sign Up</Button>
        </Link>
      </div>
    </nav>
  )
}
