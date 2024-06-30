import { MdReport } from 'react-icons/md'

import { Button } from '@/components/ui/button'

export default function ButtonReport() {
  return (
    <Button shape="circle" variant="danger" tooltip="Report">
      <MdReport className="text-xl" />
    </Button>
  )
}
