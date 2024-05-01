import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'

import AppLogo from '@/components/layout/sidebar/app-logo'
import { Button } from '@/components/ui/button'
import useGlobalContext from '@/hooks/use-global-context'

export default function CollapseSidebar() {
  const { isOpenSidebar, toggle } = useGlobalContext()

  return (
    <div className="flex items-center gap-4">
      <Button className="text-xl" shape="circle" onClick={toggle}>
        {isOpenSidebar ? <AiOutlineClose /> : <AiOutlineMenu />}
      </Button>

      <AppLogo />
    </div>
  )
}
