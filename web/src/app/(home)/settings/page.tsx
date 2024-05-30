import { RiSettings3Fill } from 'react-icons/ri'

import PageHeader from '@/components/home/page-header'
import ProfileSettingForm from '@/components/home/settings/profile-setting-form'
import { Panel } from '@/components/ui/card'
import { getCurrentUserInfo } from '@/server/actions/user'

export const metadata = () => ({
  title: 'Settings'
})

export default async function ProfileSettingPage() {
  const currentUser = await getCurrentUserInfo()

  return (
    <div className="space-y-12">
      <PageHeader icon={<RiSettings3Fill />} title="Settings" />

      <Panel wrapperClass="mx-auto w-[55rem]">
        <ProfileSettingForm user={currentUser} />
      </Panel>
    </div>
  )
}
