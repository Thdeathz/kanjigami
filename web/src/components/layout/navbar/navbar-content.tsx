'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'

import Breadcrumb from '@/components/layout/navbar/breadcrumb'
import CollapseSidebar from '@/components/layout/navbar/collapse-sidebar'
import NotificationButton from '@/components/layout/navbar/notification-button'
import RankWidget from '@/components/layout/navbar/rank-widget'
import UserButton from '@/components/layout/navbar/user-button'

const ThemeButtonClient = dynamic(() => import('@/components/layout/navbar/theme-button'), {
  ssr: false
})

type Props = {
  session: Session | null
}

export default function NavbarContent({ session }: Props) {
  const pathname = usePathname()

  const isPlayPage = pathname.includes('/play/')

  return (
    <nav className="sticky top-0 z-50 flex h-[60px] w-full items-center justify-end bg-navbar px-4 py-3 backdrop-blur-[20px]">
      <div className="flex w-full items-center gap-6">
        {isPlayPage && <CollapseSidebar />}
        <Breadcrumb />
      </div>

      <RankWidget currentUser={session?.user} />

      <div className="flex w-full items-center justify-end gap-4">
        <ThemeButtonClient />

        {session && <NotificationButton />}

        <UserButton user={session?.user} />
      </div>
    </nav>
  )
}
