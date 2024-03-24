import { BsSearchHeartFill } from 'react-icons/bs'

import { Panel } from '@/components/ui/card'

export default function SearchBox() {
  return (
    <Panel className="p-2">
      <div className="group flex min-w-[20vw] items-center justify-start gap-2 rounded-lg bg-filter px-2 font-medium">
        <BsSearchHeartFill className="text-lg opacity-60 transition-opacity group-focus:opacity-100" />

        <input className="w-full border-none bg-transparent py-2 outline-none" placeholder="面白い動画 。。。" />
      </div>
    </Panel>
  )
}
