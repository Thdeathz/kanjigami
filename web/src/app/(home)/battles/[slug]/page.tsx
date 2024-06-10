import BattleDetail from '@/components/home/battles/battle-detail'
import { getBattleDetail } from '@/server/actions/battle'

type Props = {
  params: {
    slug: string
  }
}

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = params

  const battle = await getBattleDetail(slug)

  return {
    title: `Battle #${battle.slug} - ${battle.name}`,
    description: battle.description
  }
}

export default function index({ params }: Props) {
  const { slug } = params

  return (
    <div className="space-y-8 px-[0.5rem] sm:space-y-12">
      <BattleDetail slug={slug} />
    </div>
  )
}
