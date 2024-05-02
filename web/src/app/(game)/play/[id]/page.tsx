import GameDetail from '@/components/game/play/game-detail'
import { getGameStackDetail } from '@/server/actions/game'
import { auth } from '@/server/auth'

type Props = {
  params: {
    id: string
  }
  searchParams?: {
    s?: string
    log?: string
  }
}

export const generateMetadata = async ({ params }: Props) => {
  const { id } = params

  const gameStack = await getGameStackDetail(id)

  return {
    title: `${gameStack.game.name} - ${gameStack.stack.name}`
  }
}

export default async function index({ params, searchParams }: Props) {
  const { id } = params
  const sessionId = searchParams?.s
  const logId = searchParams?.log

  const session = await auth()

  if (!session) return <p>Please login.</p>

  return <GameDetail id={id} sessionId={sessionId} userId={session.user.id} logId={logId} />
}
