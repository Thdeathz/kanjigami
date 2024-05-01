'use client'

import { cva } from 'class-variance-authority'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'
import React from 'react'
import { BsStack, BsTrophyFill } from 'react-icons/bs'
import { FaChartArea, FaHome, FaUser } from 'react-icons/fa'
import { RiSettings3Fill, RiSwordFill } from 'react-icons/ri'

import AppLogo from '@/components/layout/sidebar/app-logo'
import SideLink from '@/components/layout/sidebar/side-link'
import UpgradePlusButton from '@/components/layout/sidebar/upgrade-plus'
import useGlobalContext from '@/hooks/use-global-context'
import { cn } from '@/lib/utils'

type SideSectionProps = {
  title?: string
  children: React.ReactNode
}

function SideSection({ title, children }: SideSectionProps) {
  return (
    <div className="mt-4 pl-8">
      {title && (
        <div className="mb-2 ml-[-2rem] bg-section-heading py-1 pl-8 text-base font-semibold uppercase leading-[1.125rem] text-sidebar-link opacity-50">
          {title}
        </div>
      )}

      {children}
    </div>
  )
}

type SideMenuProps = {
  currentUsername?: string
}

export function SidebarMenu({ currentUsername }: SideMenuProps) {
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
        )}
      </div>

      <UpgradePlusButton />
    </>
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
  session: Session | null
}

export default function SidebarContent({ session }: Props) {
  const pathname = usePathname()
  const { isOpenSidebar } = useGlobalContext()

  const isPlayPage = pathname.includes('/play/')

  return (
    <aside className={cn(sidebarVariants({ fixed: isPlayPage, collapsed: !isPlayPage || isOpenSidebar }))}>
      <div className="flex-center h-[3.75rem] bg-logo px-6">
        <AppLogo />
      </div>

      <SidebarMenu currentUsername={session?.user.name} />
    </aside>
  )
}
