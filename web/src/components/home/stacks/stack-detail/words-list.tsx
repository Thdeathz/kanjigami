import { IWordItem } from '@/@types/stack'
import WordItem from '@/components/home/stacks/word-item'

type Props = {
  words: IWordItem[]
}

export default function WordsList({ words }: Props) {
  return (
    <div className="grid grid-cols-8 gap-4">
      {words.map((word) => (
        <WordItem key={word.id} word={word} />
      ))}
    </div>
  )
}
