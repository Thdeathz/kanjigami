import StackDetailOnlineContent from '@/components/home/stacks/stack-detail/online-content'
import { getNewestNotification } from '@/server/actions/notification'
import { getStackDetail } from '@/server/actions/stack'
import { getCurrentUserInfo } from '@/server/actions/user'

type Props = {
  params: {
    slug: string
  }
}

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = params

  const stack = await getStackDetail(slug)

  if (!stack) {
    return {
      title: 'Stack not found',
      description: 'Stack not found'
    }
  }

  return {
    title: `${stack.name}`,
    description: stack.description
  }
}

export default async function index({ params }: Props) {
  const { slug } = params
  const notifications = await getNewestNotification()
  const user = await getCurrentUserInfo()

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* <StackDetail slug={slug} notifications={notifications} /> */}
      <StackDetailOnlineContent slug={slug} notifications={notifications} isLoggedIn={!!user} />
    </div>
  )
}
