'use client'

import { RiSwordFill } from 'react-icons/ri'

import HomeSection from '@/components/home/homepage/home-section'
import OnlineBattlePanel from '@/components/home/online-battle-panel'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { useGetAllBattlesQuery } from '@/data/battle'

export default function LatestBattle() {
  const { data: battles, isLoading } = useGetAllBattlesQuery('FINISHED')

  if (!battles || battles.length < 1 || isLoading) {
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
