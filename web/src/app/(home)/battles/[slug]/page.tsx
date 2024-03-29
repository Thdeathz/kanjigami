import BattleStacksList from '@/components/home/battles/battle-stacks-list'
import CountDown from '@/components/home/battles/count-down'
import RoundsList from '@/components/home/battles/rounds-list'
import SectionWrapper from '@/components/home/battles/section-wrapper'
import PageHeader from '@/components/home/page-header'
import RootNotification from '@/components/home/root-notification'
import SideLeaderboard from '@/components/home/side-leaderboard'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

type Props = {
  params: {
    slug: string
  }
}

export const generateMetadata = ({ params }: Props) => {
  return {
    title: `Battle #${params.slug} - enormously since`
  }
}

export default function BattleDetail({ params }: Props) {
  const { slug } = params

  return (
    <div className="flex flex-col gap-12 px-[0.5rem]">
      <PageHeader
        title={`Battle #${slug} - enormously since`}
        description="Depraedor aureus thermae amplexus virga trans trepide cras."
        badge={
          <>
            <Badge variant="danger">Finished</Badge>
            <Badge>Code golf</Badge>
            <Badge>318 players</Badge>
          </>
        }
        showLightStick="finished"
      >
        <div className="flex-center gap-2">
          <Separator />
          <p className="whitespace-nowrap rounded-full bg-border-1 px-3 py-0.5 text-sm uppercase text-default-text-lightest">
            Start in
          </p>
          <Separator />
        </div>

        <CountDown size="large" type="animate" endTime={new Date()} />
      </PageHeader>
      <RootNotification />

      <div className="flex gap-12">
        <div className="w-0 shrink grow">
          <BattleStacksList />

          <RoundsList />
        </div>

        <div className="w-[18rem]">
          <SectionWrapper title="Battle leaders">
            <SideLeaderboard />
          </SectionWrapper>
        </div>
      </div>
    </div>
  )
}
