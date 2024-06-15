import { RiSwordFill } from 'react-icons/ri'

import { IBattle } from '@/@types/battle'
import HomeSection from '@/components/home/homepage/home-section'
import OnlineBattlePanel from '@/components/home/online-battle-panel'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'

type Props = {
  battles?: IBattle[]
}

export default function LatestBattle({ battles }: Props) {
  if (!battles || battles.length === 0) {
    return <Loading className="text-4xl" />
  }

  return (
    <HomeSection
      title="Latest battle"
      description="Compete with players around the world"
      icon={<RiSwordFill />}
      viewButton={
        <Button link="/battles" className="w-min">
          View all battles
        </Button>
      }
    >
      <OnlineBattlePanel battleData={battles[0]} />
    </HomeSection>
  )
}
