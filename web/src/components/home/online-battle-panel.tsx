import Link from 'next/link'

import OnlineCard from '@/components/home/online-card'
import { UserAvatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Panel } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function OnlineBattlePanel() {
  return (
    <Panel className="flex gap-12">
      <div className="flex basis-1/3 flex-col items-start justify-between">
        <div className="flex w-full flex-col gap-5">
          <div className="flex items-center justify-start gap-2">
            <Badge variant="danger">Finished</Badge>
            <Badge>Code golf</Badge>
          </div>

          <Link
            href="/battles"
            className="text-lg font-semibold leading-[1.4] text-default-heading transition-all hover:underline"
          >
            Battle #10 - Gradient
          </Link>

          <p className="font-base font-medium leading-[1.4] tracking-[0.3px] text-default-text-light">
            asdf asdf asdf asdf asdf asdf df asdf asdf asdf df asdf
          </p>

          <Separator />

          <p className="font-base font-medium leading-[1.4] tracking-[0.3px] text-default-text-lightest">
            Finished 60 days ago
          </p>
        </div>

        <div className="flex w-full gap-2">
          <Button>
            Leaders
            <div className="ml-1.5 flex">
              <UserAvatar
                src="/images/default-avatar.jpg"
                alt="top"
                className="z-[3] h-[30px] w-[30px] border-[3px] border-default-btn"
              />
              <UserAvatar
                src="/images/default-avatar.jpg"
                alt="top"
                className="z-[2] ml-[-10px] h-[30px] w-[30px] border-[3px] border-default-btn"
              />
              <UserAvatar
                src="/images/default-avatar.jpg"
                alt="top"
                className="ml-[-10px] h-[30px] w-[30px] border-[3px] border-default-btn"
              />
            </div>
          </Button>

          <Button link="/battles/10" variant="primary" className="relative grow">
            Play
          </Button>
        </div>
      </div>

      <div className="row-auto grid w-full grow grid-cols-auto-22% items-start gap-4">
        <OnlineCard />

        <OnlineCard />

        <OnlineCard />

        <OnlineCard />

        <OnlineCard />

        <OnlineCard />

        <OnlineCard />

        <OnlineCard />
      </div>
    </Panel>
  )
}
