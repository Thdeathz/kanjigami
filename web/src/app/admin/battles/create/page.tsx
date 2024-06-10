import dynamic from 'next/dynamic'
import { RiSwordFill } from 'react-icons/ri'

import PageHeader from '@/components/home/page-header'

const CreateBattleForm = dynamic(() => import('@/components/admin/battles/create-battle-form'), {
  ssr: false
})

export default function CreateBattlesPage() {
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
