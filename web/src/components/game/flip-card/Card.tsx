/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client'

import Image from 'next/image'
import React from 'react'

import { IImageContent, IWordContent } from '@/@types/game'

type Props = {
  word: IImageContent | IWordContent
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

function Card({ word, onClick }: Props) {
  return (
    <div
      className={`card relative cursor-pointer active:scale-95 ${word.isVisible ? '' : 'invisible'}`}
      onClick={onClick}
    >
      <div className="card-front aspect-ratio absolute h-full w-full rounded-lg bg-white">
        {word.type === 'image' && (
          <div className="relative h-full w-full">
            <Image
              src={word.image}
              alt="word"
              width={300}
              height={400}
              className="h-full w-full rounded-lg object-cover object-center"
            />

            <p className="absolute left-10 top-10 z-10 bg-white text-2xl text-black opacity-50">{word.hiragana}</p>
          </div>
        )}

        {word.type === 'word' && (
          <div className="flex-center h-full text-2xl text-black">
            <p>{word.content}</p>
          </div>
        )}
      </div>

      <div className="card-back aspect-ratio absolute h-full w-full">
        <Image
          src="/images/lock.png"
          alt="bg"
          width={300}
          height={400}
          className="h-full w-full rounded-lg object-cover object-top"
        />
      </div>
    </div>
  )
}

export default Card
