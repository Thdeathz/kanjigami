import { auth } from '@/server/auth'

type Props = {
  params: {
    id: string
    gameStackId: string
  }
  searchParams?: {
    s?: string
    log?: string
  }
}

export const generateMetadata = async ({ params }: Props) => {
  const { id: battleSlug, gameStackId } = params

  // const gameStack = await getGameStackDetail(id)

  return {
    title: `${battleSlug} - ${gameStackId}`
  }
}

export default async function index({ params, searchParams }: Props) {
  const { id: battleSlug, gameStackId } = params
  const sessionId = searchParams?.s
  const logId = searchParams?.log

  const session = await auth()

  if (!session) return <p>Please login.</p>

  return (
    <div>
      {battleSlug} {gameStackId}
    </div>
  )
}
