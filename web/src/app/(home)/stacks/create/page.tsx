import { BsStack } from 'react-icons/bs'

import CreateStackForm from '@/components/admin/stacks/create-stack-form'
import PageHeader from '@/components/home/page-header'
import RequirePlus from '@/components/home/require-plus'
import { getCurrentUserInfo } from '@/server/actions/user'

export default async function CreateStackPage() {
  const user = await getCurrentUserInfo()

  if (!user?.isPlus) {
    return <RequirePlus />
  }

  return (
    <div className="space-y-8 sm:space-y-12">
      <PageHeader icon={<BsStack />} title="Create kanji stack" description="New stack for playing and learning" />

      <CreateStackForm />
    </div>
  )
}
