import { IWordItem } from '@/@types/stack'
import WordItem from '@/components/home/stacks/word-item'

type Props = {
  words: IWordItem[]
  openWord?: string
}

export default function WordsList({ words, openWord }: Props) {
  return (
    <div className="grid grid-cols-8 gap-4">
      {words.map((word) => (
        <WordItem key={word.id} word={word} isOpen={word.content === openWord} />
      ))}
    </div>
  )
}
