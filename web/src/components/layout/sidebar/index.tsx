'use client'

import { motion } from 'framer-motion'
import React from 'react'
import { BsStack, BsTrophyFill } from 'react-icons/bs'
import { FaChartArea, FaHome, FaUser } from 'react-icons/fa'
import { RiSettings3Fill, RiSwordFill } from 'react-icons/ri'

import AppLogo from '@/components/layout/sidebar/app-logo'
import SideLink from '@/components/layout/sidebar/side-link'
import UpgradePlusButton from '@/components/layout/sidebar/upgrade-plus'

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

export default function Sidebar() {
  return (
    <motion.aside className="sticky top-0 flex flex-col bg-sidebar">
      <div className="flex-center h-[3.75rem] bg-logo px-6">
        <AppLogo />
      </div>

      <div className="grow border-r border-solid border-border-1">
        <SideSection>
          <SideLink link="/" icon={<FaHome />} title="Home" />
        </SideSection>

        <SideSection title="play">
          <SideLink link="/battles" icon={<RiSwordFill />} title="Online battles" />
          <SideLink link="/kanji" icon={<BsStack />} title="Kanji stack" />
          <SideLink link="/leaderboard" icon={<BsTrophyFill />} title="Leaderboards" />
        </SideSection>

        <SideSection title="about you">
          <SideLink link="/player" icon={<FaUser />} title="Profile" />
          <SideLink link="/me" icon={<FaChartArea />} title="Stats" />
          <SideLink link="/setting" icon={<RiSettings3Fill />} title="Settings" />
        </SideSection>
      </div>

      <UpgradePlusButton />
    </motion.aside>
  )
}
