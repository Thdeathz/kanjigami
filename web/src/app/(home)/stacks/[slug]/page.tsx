import StackDetail from '@/components/home/stacks/stack-detail'
import { getNewestNotification } from '@/server/actions/notification'
import { getStackDetail } from '@/server/actions/stack'

type Props = {
  params: {
    slug: string
  }
}

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = params

  const stack = await getStackDetail(slug)

  return {
    title: `${stack.name}`,
    description: stack.description
  }
}

export default async function index({ params }: Props) {
  const { slug } = params
  const notifications = await getNewestNotification()

  return (
    <div className="space-y-8 sm:space-y-12">
      <StackDetail slug={slug} notifications={notifications} />
    </div>
  )
}
