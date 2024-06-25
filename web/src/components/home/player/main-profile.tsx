import { AiFillEdit } from 'react-icons/ai'
import { GiJewelCrown, GiLaurelCrown } from 'react-icons/gi'

import { IUserData } from '@/@types/user'
import { UserAvatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import ProfileStats from './profile-stats'

type Props = {
  user: IUserData
}

export default function MainProfile({ user }: Props) {
  return (
    <div className="mt-24 w-full rounded-2xl bg-main-profile-light p-8 dark:bg-main-profile-dark">
      <div className="flex">
        <div className="w-full" />

        <div className="flex-center mt-[-4rem] flex-col gap-6">
          <div className="rounded-full border-2 border-default-brand">
            <UserAvatar src={user.image} alt={user.name} className="h-[100px] w-[100px] scale-[0.875] opacity-80" />
          </div>

          <h1 className="whitespace-nowrap text-[1.375rem] font-semibold text-default-link">
            {user.name}
            <span className="ml-2 rounded-full border-2 border-border px-2 py-1 text-base font-medium text-default-text-lightest">
              @{user.email.split('@')[0]}
            </span>
          </h1>
        </div>

        <div className="w-full">
          <Button link="/settings" variant="primary" className="float-right">
            <span className="hidden sm:block">Edit profile</span>
            <AiFillEdit className="block sm:hidden" />
          </Button>
        </div>
      </div>

      <div className="flex-center mt-4 flex-col gap-4 xs:flex-row">
        <ProfileStats
          icon={<GiJewelCrown />}
          label="Current rank"
          value={user.rank?.name ?? 'Unknown'}
          valueClassName="text-xl font-kanji"
        />

        <ProfileStats icon={<GiLaurelCrown />} label="Current rank point" value={user.score.toString()} />
      </div>
    </div>
  )
}
