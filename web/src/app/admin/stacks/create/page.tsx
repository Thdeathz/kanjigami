import { BsStack } from 'react-icons/bs'

import CreateStackForm from '@/components/admin/stacks/create-stack-form'
import PageHeader from '@/components/home/page-header'

export default function CreateStacksPage() {
  return (
    <div className="space-y-12">
      <PageHeader icon={<BsStack />} title="Create kanji stack" description="New stack for playing and learning" />

      <CreateStackForm />
    </div>
  )
}
