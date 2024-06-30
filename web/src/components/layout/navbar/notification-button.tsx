'use client'

import { FaBell } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export default function NotificationButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="text-xl" shape="circle" aria-label="Open notification menu">
          <FaBell />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="center" className="">
        <div className="flex-center min-h-[4rem] space-y-2 pr-4 opacity-50">🔔 No notification found.</div>
      </PopoverContent>
    </Popover>
  )
}
