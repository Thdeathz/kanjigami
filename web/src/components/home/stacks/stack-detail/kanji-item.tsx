import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

import KanjiDetail from './kanji-detail'

type Props = {
  kanji: string
}

export default function KanjiItem({ kanji }: Props) {
  return (
    <HoverCard>
      <HoverCardTrigger className="inline-block cursor-pointer underline-offset-4 transition-all duration-150 hover:underline">
        {kanji}
      </HoverCardTrigger>
      <HoverCardContent className="text-base font-medium">
        <KanjiDetail kanji={kanji} />
      </HoverCardContent>
    </HoverCard>
  )
}
