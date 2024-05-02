import { IGameStackDetail } from '@/@types/game'

import { Panel } from '../ui/card'

import ButtonStart from './button-start'

type Props = {
  gameStack: IGameStackDetail
}

export default function IdleMenu({ gameStack }: Props) {
  return (
    <div className="place-center mx-auto w-[30rem]">
      <Panel>
        <h1 className="text-xl font-semibold">{gameStack.game.name}</h1>

        <p>{gameStack.stack.name}</p>
        <p>{gameStack.numberOfWords} words</p>
        <p>{gameStack.timeLimit}s</p>

        <ButtonStart gameStackId={gameStack.id} />
      </Panel>
    </div>
  )
}