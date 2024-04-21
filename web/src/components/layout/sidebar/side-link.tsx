'use client'

import { cva } from 'class-variance-authority'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type ReactElement } from 'react'
import { type IconType } from 'react-icons'
import { BsStack, BsTrophyFill } from 'react-icons/bs'
import { FaChartArea, FaHome, FaUser } from 'react-icons/fa'
import { RiSettings3Fill, RiSwordFill } from 'react-icons/ri'

import { cn } from '@/lib/utils'

const sideLinkVariants = cva(
  'relative group flex items-center text-base font-medium py-2 my-1 rounded-s-full transition-colors durations-200 hover:text-sidebar-link-hover',
  {
    variants: {
      active: {
        default: 'text-sidebar-link',
        active: 'ml-[-1rem] text-sidebar-link-hover pl-4 bg-side-link shadow-btn'
      }
    },
    defaultVariants: {
      active: 'default'
    }
  }
)

const icons = {
  Home: <FaHome />,
  'Online battles': <RiSwordFill />,
  'Kanji stacks': <BsStack />,
  Leaderboards: <BsTrophyFill />,
  Profile: <FaUser />,
  Stats: <FaChartArea />,
  Settings: <RiSettings3Fill />
}

export interface Props {
  link: string
  icon: ReactElement<IconType>
  title: string
  matchRegex?: string
}

function getIconClassName(isActive: boolean) {
  return cn('transition-all group-hover:text-sidebar-icon-hover group-hover:translate-x-[-3px]', {
    'text-sidebar-icon-hover': isActive,
    'text-sidebar-icon': !isActive
  })
}

export default function SideLink({ link, icon, title, matchRegex }: Props) {
  const pathname = usePathname()
  const regex = matchRegex ? new RegExp(matchRegex) : null
  const isActive = pathname === link || (pathname === '/' && link === '/') || Boolean(regex?.test(pathname))

  const iconClassName = getIconClassName(isActive)

  return (
    <Link href={link} className={cn(sideLinkVariants({ active: isActive ? 'active' : 'default' }))}>
      <span className={iconClassName}> {icon}</span>

      <span className="ml-2 inline grow leading-[1.125rem]">{title}</span>
    </Link>
  )
}
