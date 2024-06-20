import dynamic from 'next/dynamic'
import { RiSwordFill } from 'react-icons/ri'

import PageHeader from '@/components/home/page-header'
import RequirePlus from '@/components/home/require-plus'
import { getCurrentUserInfo } from '@/server/actions/user'

const CreateBattleForm = dynamic(() => import('@/components/admin/battles/create-battle-form'), {
  ssr: false
})

export default async function CreateBattlePage() {
  const user = await getCurrentUserInfo()

  if (!user?.isPlus) {
    return <RequirePlus />
  }

  return (
    <div className="space-y-8 sm:space-y-12">
      <PageHeader
        icon={<RiSwordFill />}
        title="Create Online battles"
        description="Create new battle for learning kanji"
      />

      <CreateBattleForm />
    </div>
  )
}
