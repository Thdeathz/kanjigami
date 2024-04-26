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
    title: `${stack.name} | 漢字ガミ`
  }
}

export default function index({ params }: Props) {
  const { slug } = params

  return (
    <div className="flex flex-col gap-12">
      <StackDetail slug={slug} />
    </div>
  )
}
