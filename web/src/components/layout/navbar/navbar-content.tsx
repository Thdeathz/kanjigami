'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

import { IUserInfo } from '@/@types/auth'
import Breadcrumb from '@/components/layout/navbar/breadcrumb'
import CollapseSidebar from '@/components/layout/navbar/collapse-sidebar'
import NotificationButton from '@/components/layout/navbar/notification-button'
import RankWidget from '@/components/layout/navbar/rank-widget'
import UserButton from '@/components/layout/navbar/user-button'

const ThemeButtonClient = dynamic(() => import('@/components/layout/navbar/theme-button'), {
  ssr: false
})

type Props = {
  currentUser: IUserInfo | null
}

export default function NavbarContent({ currentUser }: Props) {
  const pathname = usePathname()

  const isPlayPage = pathname.includes('/play/')

  return (
    <nav className="sticky top-0 z-50 flex h-[60px] w-full items-center justify-end bg-navbar px-4 py-3 backdrop-blur-[20px]">
      <div className="flex w-full items-center gap-6">
        {isPlayPage && <CollapseSidebar />}
        <Breadcrumb />
      </div>

      <RankWidget currentUserRole={currentUser?.role} />

      <div className="flex w-full items-center justify-end gap-4">
        <ThemeButtonClient />

        {currentUser && <NotificationButton />}

        <UserButton user={currentUser} />
      </div>
    </nav>
  )
}
