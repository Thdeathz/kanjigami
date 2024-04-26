'use client'

import Loading from '@/components/loading'
import { useGetKanjiDetailQuery } from '@/data/stack'

type Props = {
  kanji: string
}

export default function KanjiDetail({ kanji }: Props) {
  const { data, isLoading } = useGetKanjiDetailQuery(kanji)

  if (isLoading) return <Loading className="text-2xl" />

  if (!data) return <p>Kanji not found.</p>

  return (
    <div className="h-full w-full items-start">
      <div className="text-lg">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold">{data.content}</h1>

          <div className="flex items-center gap-2">
            <p>{data.kunyomi}</p>
            <p>{data.onyomi}</p>
          </div>
        </div>

        <p className="py-0.5">{data.meaning.join(', ')}</p>
      </div>

      <video src={data.kakikata} muted autoPlay loop className="aspect-square w-[4.5rem] rounded" />
    </div>
  )
}
