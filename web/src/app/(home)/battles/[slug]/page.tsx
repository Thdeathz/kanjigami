import BattleDetail from '@/components/home/battles/battle-detail'
import { getBattleDetail } from '@/server/actions/battle'
import { getNewestNotification } from '@/server/actions/notification'

type Props = {
  params: {
    slug: string
  }
}

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = params

  const battle = await getBattleDetail(slug)

  if (!battle) {
    return {
      title: 'Battle not found',
      description: 'Battle not found'
    }
  }

  return {
    title: `Battle #${battle.slug} - ${battle.name}`,
    description: battle.description
  }
}

export default async function index({ params }: Props) {
  const { slug } = params
  const notifications = await getNewestNotification()

  return (
    <div className="space-y-8 px-[0.5rem] sm:space-y-12">
      <BattleDetail slug={slug} notifications={notifications} />
    </div>
  )
}
