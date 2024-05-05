'use client'

import Image from 'next/image'
import React from 'react'

import { IMultipleChoiceGameContent } from '@/@types/game'
import { Panel } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Props = {
  data: IMultipleChoiceGameContent
  questionIndex: number
  onSelect: (answer: number, question: number) => void
}

export default function QuestionPanel({ data, questionIndex, onSelect }: Props) {
  const handleSelect = (answer: number) => {
    if (typeof onSelect === 'function') onSelect(answer, questionIndex)
  }

  return (
    <Panel wrapperClass="grow" className="flex h-full flex-col items-start justify-between gap-6">
      <div className="flex-center h-48 w-full">
        {data.question.type === 'word' && <h1 className="text-center text-4xl font-medium">{data.question.content}</h1>}

        {data.question.type === 'image' && (
          <Image
            width={300}
            height={400}
            className="h-full w-full rounded-md object-contain"
            src={data.question.image}
            alt="question"
          />
        )}
      </div>

      <div className="grid w-full grow grid-cols-2 grid-rows-2 gap-12 p-6">
        {data.options.map((each, index) => (
          <button
            type="button"
            key={each.id}
            className={cn('border-divider-light rounded-md border-2 text-2xl transition-colors duration-200', {
              'bg-default-brand text-black': data.selectedAnswer === index
            })}
            onClick={() => handleSelect(index)}
          >
            {each.hiragana}
          </button>
        ))}
      </div>
    </Panel>
  )
}
