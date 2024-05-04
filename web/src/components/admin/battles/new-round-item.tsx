import Image from 'next/image'

import EditRoundModal from '@/components/admin/battles/edit-round-modal'
import { Button } from '@/components/ui/button'

export default function NewRoundItem() {
  return (
    <div className="group relative h-40 rounded-2xl bg-stack p-2.5 shadow-stack-light transition-transform duration-200 hover:scale-105 dark:shadow-stack-dark">
      <Image
        src="/images/lock.png"
        alt="round-item"
        width={400}
        height={300}
        className="aspect-ratio block h-full w-full rounded-lg border-[3px] border-solid border-white object-cover dark:border-default-stack"
      />

      <div className="flex-center invisible absolute left-0 top-0 z-10 h-full w-full flex-col gap-4 opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:visible group-hover:bg-underlay group-hover:opacity-100">
        <EditRoundModal />

        <Button type="button">Delete</Button>
      </div>
    </div>
  )
}
