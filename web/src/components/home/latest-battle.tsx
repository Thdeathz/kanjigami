'use client'

import { RiSwordFill } from 'react-icons/ri'

import { Button } from '../ui/button'

import HomeSection from './home-section'
import OnlineBattlePanel from './online-battle-panel'

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
