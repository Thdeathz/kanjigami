'use client'

import { BsStack } from 'react-icons/bs'

import HomeSection from '@/components/home/home-section'
import StackCard from '@/components/home/stack-card'
import { Button } from '@/components/ui/button'

export default function FollowingBattle() {
  return (
    <HomeSection
      title="Following kanji stack"
      description="Play game and learn more kanji"
      icon={<BsStack />}
      viewButton={<Button onClick={() => {}}>View all kanji stacks</Button>}
    >
      <div className="grid grid-cols-5 gap-8">
        <StackCard />

        <StackCard />

        <StackCard />

        <StackCard />

        <StackCard />

        <StackCard />

        <StackCard />

        <StackCard />

        <StackCard />

        <StackCard />

        <StackCard />
      </div>
    </HomeSection>
  )
}
