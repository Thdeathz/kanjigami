import { RiSettings3Fill } from 'react-icons/ri'

import PageHeader from '@/components/home/page-header'
import ProfileSettingForm from '@/components/home/settings/profile-setting-form'
import { Panel } from '@/components/ui/card'

export const metadata = () => ({
  title: 'Settings'
})

export default function ProfileSettingPage() {
  return (
    <div className="space-y-12">
      <PageHeader icon={<RiSettings3Fill />} title="Settings" />

      <Panel wrapperClass="mx-auto w-[55rem]">
        <ProfileSettingForm />
      </Panel>
    </div>
  )
}
