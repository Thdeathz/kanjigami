import OnlinePlay from '@/components/game/play/online-play'
import { getCurrentUserInfo } from '@/server/actions/user'

type Props = {
  params: {
    id: string
    roundIndex: string
  }
  searchParams?: {
    s?: string
    log?: string
  }
}

export const generateMetadata = async ({ params }: Props) => {
  const { id: battleSlug, roundIndex } = params

  return {
    title: `Battle #${battleSlug} - Round ${roundIndex}`
  }
}

export default async function index({ params, searchParams }: Props) {
  const { id: battleSlug, roundIndex } = params
  const sessionId = searchParams?.s
  const logId = searchParams?.log

  const currentUser = await getCurrentUserInfo()

  if (!currentUser) return <p>Please login.</p>

  return (
    <OnlinePlay
      battleSlug={battleSlug}
      roundIndex={roundIndex}
      currentSessionId={sessionId}
      logId={logId}
      user={currentUser}
    />
  )
}
