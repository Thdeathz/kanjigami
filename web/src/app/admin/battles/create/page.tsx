import { RiSwordFill } from 'react-icons/ri'

import CreateBattleForm from '@/components/admin/battles/create-battle-form'
import PageHeader from '@/components/home/page-header'

export default function CreateBattlesPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        icon={<RiSwordFill />}
        title="Create Online battles"
        description="Create new battle for learning kanji"
      />

      <CreateBattleForm />
    </div>
  )
}
