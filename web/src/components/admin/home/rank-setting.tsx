'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import { FaExchangeAlt } from 'react-icons/fa'
import { toast } from 'sonner'

import { IFile } from '@/@types'
import { IRankSetting } from '@/@types/setting'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { editRank } from '@/server/actions/setting'

type Props = {
  ranks?: IRankSetting[]
}

export default function RankSetting({ ranks }: Props) {
  const router = useRouter()
  const [data, setData] = useState(ranks)
  const [isPending, startTransition] = useTransition()

  const onSaveChanges = () => {
    startTransition(async () => {
      try {
        const formData = new FormData()

        data?.forEach((rank, index) => {
          formData.append('ids[]', rank.id)
          if (rank.file) {
            formData.append('images', rank.file)
          } else {
            formData.append(`icons[${index}]`, rank.icon)
          }
          formData.append('names[]', rank.name)
          formData.append('scores[]', rank.score)
        })

        await editRank(formData)

        toast.success('Ranks updated successfully')
        router.refresh()
      } catch (error) {
        toast.error('Failed to update ranks. Please try again latter.')
      }
    })
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0] as IFile
    if (!file) return

    file.preview = URL.createObjectURL(file)

    const newRanks =
      data?.map((rank) => {
        if (rank.id === id) {
          return { ...rank, file }
        }
        return rank as IRankSetting
      }) || []

    setData(newRanks)
  }

  return (
    <div className="mt-3 space-y-2">
      <Button variant="primary" isLoading={isPending} onClick={onSaveChanges}>
        Upload & Save
      </Button>

      <div className="grid grid-cols-5 gap-4">
        {data?.map((item) => (
          <div
            key={item.id}
            className={cn('space-y-4 rounded-md border-2 p-3', item.file ? 'border-danger-text' : 'border-border')}
          >
            <div className="group relative aspect-video w-full rounded">
              <input
                type="file"
                className="absolute left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0"
                onChange={(e) => onFileChange(e, item.id)}
              />

              <div className="flex-center invisible absolute left-0 top-0 h-full w-full cursor-pointer opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:visible group-hover:bg-underlay group-hover:opacity-100">
                <FaExchangeAlt className="text-3xl" />
              </div>

              <Image
                src={item.file?.preview ?? item.icon}
                alt={item.name}
                width={400}
                height={200}
                className="aspect-square w-full rounded object-cover"
              />
            </div>

            <div className="flex gap-2">
              <Input
                value={item.name}
                onChange={(e) => {
                  setData((prev) =>
                    prev?.map((rank) => {
                      if (rank.id === item.id) {
                        return { ...rank, name: e.target.value }
                      }
                      return rank
                    })
                  )
                }}
              />

              <Input
                value={item.score}
                type="number"
                min={0}
                max={99999}
                onChange={(e) => {
                  setData((prev) =>
                    prev?.map((rank) => {
                      if (rank.id === item.id) {
                        return { ...rank, score: e.target.value }
                      }
                      return rank
                    })
                  )
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
