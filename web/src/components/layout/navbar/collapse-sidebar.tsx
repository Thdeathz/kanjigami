'use client'

import { usePathname } from 'next/navigation'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'

import AppLogo from '@/components/layout/sidebar/app-logo'
import { Button } from '@/components/ui/button'
import useGlobalContext from '@/hooks/use-global-context'
import { cn } from '@/lib/utils'

export default function CollapseSidebar() {
  const pathname = usePathname()
  const { isOpenSidebar, toggle } = useGlobalContext()

  const isPlayPage = pathname.includes('/play/')

  return (
    <div className={cn('items-center gap-2 sm:gap-4', isPlayPage ? 'lg:flex' : 'lg:hidden', 'flex')}>
      <Button className="text-xl" shape="circle" aria-label="collapse-toggle" onClick={toggle}>
        {isOpenSidebar ? <AiOutlineClose /> : <AiOutlineMenu />}
      </Button>

      <AppLogo />
    </div>
  )
}
