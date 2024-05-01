import GameDetail from '@/components/home/play/game-detail'

type Props = {
  params: {
    id: string
  }
}

export default function index({ params }: Props) {
  const { id } = params

  return (
    <div className="flex flex-col gap-12 px-[0.5rem]">
      <GameDetail id={id} />
    </div>
  )
}
