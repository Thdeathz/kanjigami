import { IGameStackDetail } from '@/@types/game'

import { Panel } from '../ui/card'

import ButtonStart from './button-start'

type Props = {
  gameStack: IGameStackDetail
}

export default function IdleMenu({ gameStack }: Props) {
  return (
    <Panel wrapperClass="place-center mx-auto w-[30rem]">
      <h1 className="text-xl font-semibold">{gameStack.game.name}</h1>

      <p>{gameStack.stack.name}</p>
      <p>{gameStack.numberOfWords} words</p>
      <p>{gameStack.timeLimit}s</p>

      <ButtonStart type="OFFLINE" gameStackId={gameStack.id} />
    </Panel>
  )
}
