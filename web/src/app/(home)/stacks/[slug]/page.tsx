import SectionWrapper from '@/components/home/battles/section-wrapper'
import PageHeader from '@/components/home/page-header'
import RootNotification from '@/components/home/root-notification'
import GamesList from '@/components/home/stacks/games-list'
import KanjisList from '@/components/home/stacks/kanjis-list'

type Props = {
  params: {
    slug: string
  }
}

export const generateMetadata = ({ params }: Props) => {
  return {
    title: '井上 菜摘 | 漢字ガミ'
  }
}

export default function StackDetail({ params }: Props) {
  const { slug } = params

  return (
    <div className="flex flex-col gap-12">
      <PageHeader title="井上 菜摘" description="Depraedor aureus thermae amplexus virga trans trepide cras." />

      <RootNotification />

      <GamesList />

      <div className="flex gap-12">
        <div className="w-0 shrink grow">
          <SectionWrapper title="Kanji stack">
            <KanjisList />
          </SectionWrapper>
        </div>

        <div className="w-[18rem]">
          <SectionWrapper title="Stack leaders">
            {/* TODO: <SideLeaderboard /> */}
            <p>Leaderboard</p>
          </SectionWrapper>
        </div>
      </div>
    </div>
  )
}
