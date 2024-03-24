'use client'

import { RiSwordFill } from 'react-icons/ri'

import HomeSection from '@/components/home/homepage/home-section'
import OnlineBattlePanel from '@/components/home/online-battle-panel'
import { Button } from '@/components/ui/button'

export default function LatestBattle() {
  return (
    <HomeSection
      title="Latest battle"
      description="Compete with players around the world"
      icon={<RiSwordFill />}
      viewButton={<Button onClick={() => {}}>View all battles</Button>}
    >
      <OnlineBattlePanel />
    </HomeSection>
  )
}
