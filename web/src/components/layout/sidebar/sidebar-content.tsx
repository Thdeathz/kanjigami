'use client'

import { cva } from 'class-variance-authority'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BsStack, BsTrophyFill } from 'react-icons/bs'
import { FaChartArea, FaHome, FaUser } from 'react-icons/fa'
import { RiFolderDownloadFill, RiSettings3Fill, RiSwordFill } from 'react-icons/ri'

import { IUserInfo } from '@/@types/auth'
import AppLogo from '@/components/layout/sidebar/app-logo'
import SideLink from '@/components/layout/sidebar/side-link'
import SideSection from '@/components/layout/sidebar/side-section'
import UpgradePlusButton from '@/components/layout/sidebar/upgrade-plus'
import useGlobalContext from '@/hooks/use-global-context'
import { cn } from '@/lib/utils'

type SideMenuProps = {
  currentUsername?: string
  isPlus?: boolean
}

export function UserSidebarMenu({ currentUsername, isPlus = false }: SideMenuProps) {
  return (
    <>
      <div className="grow border-r border-solid border-border-1">
        <SideSection>
          <SideLink link="/" icon={<FaHome />} title="Home" />
        </SideSection>

        <SideSection title="play">
          <SideLink link="/battles" icon={<RiSwordFill />} title="Online battles" />
          <SideLink link="/stacks" icon={<BsStack />} title="Kanji stacks" />
          <SideLink link="/leaderboard" icon={<BsTrophyFill />} title="Leaderboards" matchRegex="\/leaderboard\/\S+" />
        </SideSection>

        {currentUsername && (
          <>
            <SideSection title="about you">
              <SideLink
                link={`/player/${currentUsername}`}
                icon={<FaUser />}
                title="Profile"
                matchRegex="\/player\/\S+"
              />
              <SideLink link="/me" icon={<FaChartArea />} title="Stats" />
              <SideLink link="/settings" icon={<RiSettings3Fill />} title="Settings" />
            </SideSection>

            <SideSection title="offline">
              <SideLink link="/downloads" icon={<RiFolderDownloadFill />} title="Download stacks" />
            </SideSection>
          </>
        )}
      </div>

      {currentUsername && <UpgradePlusButton isPlus={isPlus} />}
    </>
  )
}

export function AdminSidebarMenu() {
  return (
    <div className="border-r border-solid border-border-1">
      <SideSection>
        <SideLink link="/admin" icon={<FaHome />} title="Dashboard" />
      </SideSection>

      <SideSection title="Setting">
        <SideLink link="/admin/home" icon={<FaHome />} title="Home" />
        <SideLink link="/admin/battles" icon={<RiSwordFill />} title="Battle" />
        <SideLink link="/admin/stacks" icon={<BsStack />} title="Stack" />
      </SideSection>
    </div>
  )
}

const sidebarVariants = cva('top-0 flex flex-col bg-sidebar backdrop-blur-sm', {
  variants: {
    fixed: {
      true: 'absolute h-full z-50 transition-transform duration-300',
      false: 'sticky'
    },
    collapsed: {
      true: 'translate-x-0',
      false: 'translate-x-[-100%]'
    }
  },
  defaultVariants: {
    fixed: false
  }
})

type Props = {
  currentUser: IUserInfo | null
}

export default function SidebarContent({ currentUser }: Props) {
  const pathname = usePathname()
  const { isOpenSidebar } = useGlobalContext()

  const isPlayPage = pathname.includes('/play/')

  return (
    <aside className={cn(sidebarVariants({ fixed: isPlayPage, collapsed: !isPlayPage || isOpenSidebar }))}>
      <div className="flex-center h-[3.75rem] bg-logo px-6">
        <AppLogo />
      </div>

      {currentUser?.role === 'ADMIN' ? (
        <AdminSidebarMenu />
      ) : (
        <UserSidebarMenu currentUsername={currentUser?.name} isPlus={currentUser?.isPlus} />
      )}
    </aside>
  )
}
