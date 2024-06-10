import StackDetail from '@/components/home/stacks/stack-detail'
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

export default function index({ params }: Props) {
  const { slug } = params

  return (
    <div className="space-y-8 sm:space-y-12">
      <StackDetail slug={slug} />
    </div>
  )
}
