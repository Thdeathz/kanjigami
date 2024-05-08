import React from 'react'
import { BsSearchHeartFill } from 'react-icons/bs'

import { cn } from '@/lib/utils'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function InputSearch({ className, ...props }: Props) {
  return (
    <div className="group flex min-w-[20vw] items-center justify-start gap-2 rounded-lg bg-filter px-2 font-medium">
      <BsSearchHeartFill className="text-lg opacity-60 transition-opacity group-focus:opacity-100" />

      <input className={cn('w-full border-none bg-transparent py-2 outline-none', className)} {...props} />
    </div>
  )
}
