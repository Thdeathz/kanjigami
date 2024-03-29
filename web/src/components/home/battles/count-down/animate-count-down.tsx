/* eslint-disable react/no-array-index-key */
import { VariantProps, cva } from 'class-variance-authority'
import React, { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

const numberClassName = cva('count relative w-7 rounded-lg text-center text-default-text-light dark:shadow-timer', {
  variants: {
    size: {
      large: 'h-10',
      normal: 'h-9'
    }
  },
  defaultVariants: {
    size: 'normal'
  }
})

interface NumberProps extends VariantProps<typeof numberClassName> {
  value: string
  nextValue: string
}

function Number({ value, nextValue, size }: NumberProps) {
  const el = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (nextValue === value) return

    el.current?.classList.remove('changed')

    setTimeout(() => {
      el.current?.classList.add('changing')
    }, 20)

    setTimeout(() => {
      el.current?.classList.add('changed')
      el.current?.classList.remove('changing')
    }, 950)
  }, [nextValue, value])

  return (
    <div ref={el} className={cn(numberClassName({ size }))}>
      <span className="current-top z-[4] h-1/2 overflow-hidden rounded-t-lg py-1 before:bottom-0 after:rounded-t-lg">
        {value}
      </span>

      <span className="next-top z-[3] h-1/2 overflow-hidden rounded-t-lg py-1 before:bottom-0 after:rounded-t-lg">
        {nextValue}
      </span>

      <span className="current-bottom z-[1] h-full rounded-lg py-1 before:top-[50%] after:rounded-b-lg">{value}</span>

      <span className="next-bottom z-[2] h-full rounded-lg py-1 before:top-[50%] after:rounded-b-lg">{nextValue}</span>
    </div>
  )
}

interface Props extends VariantProps<typeof numberClassName> {
  number: number
}

function AnimateCountDown({ number, size }: Props) {
  const [numbers, setNumbers] = useState<string[]>(number.toString().padStart(2, '0').split(''))
  const [lastNumbers, setLastNumbers] = useState<string[]>(number.toString().padStart(2, '0').split(''))

  useEffect(() => {
    const arr = number.toString().padStart(2, '0').split('')

    setLastNumbers([...numbers])
    setNumbers(arr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number])

  return (
    <div className={`flex-center gap-1.5 font-medium ${size === 'normal' ? 'text-lg' : 'text-2xl'}`}>
      {numbers.map((n, index) => (
        <Number key={`animate-count-down${index}`} value={lastNumbers[index]} nextValue={n} size={size} />
      ))}
    </div>
  )
}

export default AnimateCountDown
