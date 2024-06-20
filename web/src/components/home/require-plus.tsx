'use client'

import PlusBadge from '@/components/plus-badge'
import { Button } from '@/components/ui/button'

export default function RequirePlus() {
  return (
    <div className="flex-center min-h-content p-12">
      <div className="mx-auto h-full max-w-[1600px]">
        <div className="space-y-4 text-center">
          <p className="font-secondary text-lg font-medium leading-10">
            Only Plus users can access this page
            <br />
            Please check ur plan.
          </p>

          <Button link="/plus">
            <span className="mr-2">Upgrade to</span> <PlusBadge />
          </Button>
        </div>
      </div>
    </div>
  )
}
