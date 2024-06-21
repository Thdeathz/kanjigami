'use client'

import { FaBell } from 'react-icons/fa'

import { Button } from '@/components/ui/button'

export default function NotificationButton() {
  return (
    <Button className="text-xl" shape="circle" aria-label="Open notification menu">
      <FaBell />
    </Button>
  )
}
