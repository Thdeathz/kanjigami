import { GiJewelCrown, GiLaurelCrown } from 'react-icons/gi'

import { UserAvatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import ProfileStats from './profile-stats'

export default function MainProfile() {
  return (
    <div className="mt-24 w-full rounded-2xl bg-main-profile-light p-8 dark:bg-main-profile-dark">
      <div className="flex">
        <div className="w-full" />

        <div className="flex-center mt-[-4rem] flex-col gap-6">
          <div className="rounded-full border-2 border-default-brand">
            <UserAvatar
              src="/images/default-avatar.jpg"
              alt="main-profile"
              className="h-[100px] w-[100px] scale-[0.875] opacity-80"
            />
          </div>

          <h1 className="whitespace-nowrap text-[1.375rem] font-semibold text-default-link">
            Dung Bui
            <span className="ml-2 rounded-full border-2 border-border px-2 py-1 text-base font-medium text-default-text-lightest">
              @thdeathz
            </span>
          </h1>
        </div>

        <div className="w-full">
          <Button variant="primary" className="float-right">
            Edit profile
          </Button>
        </div>
      </div>

      <div className="flex-center mt-4 gap-4">
        <ProfileStats icon={<GiJewelCrown />} label="Current rank" value="Kanji kunoichi" />

        <ProfileStats icon={<GiLaurelCrown />} label="Current rank point" value="32353" />
      </div>
    </div>
  )
}
