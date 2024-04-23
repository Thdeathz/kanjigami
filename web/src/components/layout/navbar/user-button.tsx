'use client'

import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'
import { FaChartArea, FaUser } from 'react-icons/fa'
import { HiLogout, HiSparkles } from 'react-icons/hi'
import { RiSettings3Fill } from 'react-icons/ri'
import { toast } from 'sonner'

import { IUserInfo } from '@/@types/auth'
import PlusBadge from '@/components/plus-badge'
import { UserAvatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useLogoutMutation } from '@/data/auth'
import { cn } from '@/lib/utils'

type ItemProps = {
  icon: React.ReactElement<IconType>
  text: React.ReactNode
  to?: string
  onClick?: () => void
  primary?: boolean
}

function Item({ icon, text, to, primary = false, onClick }: ItemProps) {
  return (
    <div className={cn('flex items-center gap-2.5', { 'text-default-brand': primary })}>
      <span className="text-base">{icon}</span>
      {to && (
        <Link href={to} className="transition-all duration-150 hover:underline">
          {text}
        </Link>
      )}

      {onClick && (
        <button type="button" onClick={onClick} className="transition-all duration-150 hover:underline">
          {text}
        </button>
      )}
    </div>
  )
}

type Props = {
  user?: IUserInfo
}

export default function UserButton({ user }: Props) {
  const { mutateAsync } = useLogoutMutation()

  const handleLogout = async () => {
    await mutateAsync()

    toast.success('Logged out successfully')
  }

  if (!user)
    return (
      <Link href="/login">
        <Button>Sign In / Sign Up</Button>
      </Link>
    )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <UserAvatar className="mr-2" size="small" src={user.image} alt={user.name} /> {user.name}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="">
        <div className="space-y-2 pr-4">
          <Item
            to="/upgrade"
            icon={<HiSparkles />}
            text={
              <div className="flex-center gap-2">
                <span>Upgrade to</span>
                <PlusBadge />
              </div>
            }
            primary
          />

          <Item to={`/player/${user.name}`} icon={<FaUser />} text="View profile" />

          <Item to="/me" icon={<FaChartArea />} text="My Analytics" />

          <Item to="/settings" icon={<RiSettings3Fill />} text="Settings" />

          <Item icon={<HiLogout />} text="Logout" onClick={() => handleLogout()} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
