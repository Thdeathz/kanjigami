import Image from 'next/image'
import React, { Fragment } from 'react'

import Loading from '@/components/loading'
import { useGetWordDetailQuery } from '@/data/stack'

import KanjiItem from './stack-detail/kanji-item'

type Props = {
  wordId: string
}

function DetailItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-5 items-start gap-2">
      <div className="bg-table-header px-2 font-medium">{label}</div>
      <div className="col-span-4">{value}</div>
    </div>
  )
}

export default function WordDetail({ wordId }: Props) {
  const { data: word, isLoading } = useGetWordDetailQuery(wordId)

  if (isLoading) {
    return <Loading className="text-4xl" />
  }

  if (!word) {
    return <p>Word not found.</p>
  }

  return (
    <div className="relative space-y-4 sm:grid sm:grid-cols-2 sm:gap-4">
      <div className="space-y-4">
        <DetailItem
          label="Kanji"
          value={
            <p className="space-x-1 text-xl">
              {word.content.split('').map((each) => (
                <KanjiItem key={each} kanji={each} />
              ))}
            </p>
          }
        />

        <DetailItem label="Hiragana" value={word.hiragana} />

        <DetailItem label="Meaning" value={word.meaning} />

        {word.examples.length !== 0 && (
          <DetailItem
            label="Examples"
            value={
              <>
                {word.examples.map((example) => (
                  <Fragment key={example.id}>
                    <p>{example.content}</p>
                    <p>{example.romaji}</p>
                    <p>{example.meaning}</p>
                  </Fragment>
                ))}
              </>
            }
          />
        )}
      </div>

      <div className="sticky top-0 h-min">
        <Image
          src={word.image ?? '/images/lock.png'}
          alt={word.content}
          width={450}
          height={450}
          className="rounded-md"
        />

        <div className="mt-4 flex gap-4">
          {word.kanjis.map((kanji) => (
            <video
              key={kanji.id}
              src={kanji.kakikata}
              width={100}
              height={100}
              autoPlay
              loop
              muted
              className="rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
