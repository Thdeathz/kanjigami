import { Suspense } from 'react'

import StackDetail from '@/components/home/stacks/stack-detail'
import Loading from '@/components/loading'
import { getStackDetail } from '@/server/actions/stack'

type Props = {
  params: {
    slug: string
  }
  searchParams?: {
    word?: string
  }
}

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = params

  const stack = await getStackDetail(slug)

  return {
    title: `${stack.name}`
  }
}

export default function index({ params, searchParams }: Props) {
  const { slug } = params
  const word = searchParams?.word || ''

  return (
    <div className="space-y-12">
      <Suspense key={word} fallback={<Loading className="text-2xl" />}>
        <StackDetail slug={slug} openWord={word} />
      </Suspense>
    </div>
  )
}
