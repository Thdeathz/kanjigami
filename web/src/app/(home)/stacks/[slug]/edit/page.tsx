import { BsStack } from 'react-icons/bs'

import CreateStackForm from '@/components/admin/stacks/create-stack-form'
import EditGameStack from '@/components/admin/stacks/edit-game-stack'
import PageHeader from '@/components/home/page-header'
import RequirePlus from '@/components/home/require-plus'
import { getStackDetailToEdit } from '@/server/actions/stack'
import { getCurrentUserInfo } from '@/server/actions/user'

type Props = {
  params: {
    slug: string
  }
}

export default async function EditStackPage({ params }: Props) {
  const user = await getCurrentUserInfo()
  const stack = await getStackDetailToEdit(params.slug)

  if (!user?.isPlus && user?.role !== 'ADMIN') {
    return <RequirePlus />
  }

  if (!stack) return <p>Stack not found</p>

  return (
    <div className="space-y-8 sm:space-y-12">
      <PageHeader icon={<BsStack />} title={stack?.name ?? 'Unknown'} />

      <EditGameStack availableWords={stack?.words.length ?? 0} stackSlug={params.slug} currentGames={stack?.games} />

      <CreateStackForm currentStack={stack} />
    </div>
  )
}
