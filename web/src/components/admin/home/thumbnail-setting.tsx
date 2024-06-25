'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import { FaExchangeAlt } from 'react-icons/fa'
import { toast } from 'sonner'

import { IFile } from '@/@types'
import { IThumbnailSetting } from '@/@types/setting'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { editThumbnail } from '@/server/actions/setting'

type Props = {
  thumbnails?: IThumbnailSetting[]
}

export default function ThumbnailSetting({ thumbnails }: Props) {
  const router = useRouter()
  const [images, setImages] = useState(thumbnails)
  const [isPending, startTransition] = useTransition()

  const onSaveChanges = () => {
    if (images?.length === 0 || !images?.find((e) => e.file)) return

    startTransition(async () => {
      try {
        const formData = new FormData()

        images?.forEach((image) => {
          if (image.file) {
            console.log(image)
            formData.append('ids[]', image.id)
            formData.append('images', image.file)
            formData.append('alts[]', image.alt)
          }
        })

        await editThumbnail(formData)

        toast.success('Thumbnails updated successfully')
        router.refresh()
      } catch (error) {
        toast.error('Failed to update thumbnails. Please try again latter.')
      }
    })
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0] as IFile
    if (!file) return

    file.preview = URL.createObjectURL(file)

    const newImages =
      images?.map((image) => {
        if (image.id === id) {
          return { ...image, file }
        }
        return image as IThumbnailSetting
      }) || []

    setImages(newImages)
  }

  return (
    <div className="space-y-2">
      <Button
        variant="primary"
        disabled={!images?.find((e) => e.file) || isPending}
        isLoading={isPending}
        onClick={onSaveChanges}
      >
        Upload & Save
      </Button>

      <div className="grid grid-cols-4 gap-4">
        {images?.map((image) => (
          <div
            key={image.id}
            className={cn('space-y-4 rounded-md border-2 p-3', image.file ? 'border-danger-text' : 'border-border')}
          >
            <div className="group relative aspect-video w-full rounded">
              <input
                type="file"
                className="absolute left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0"
                onChange={(e) => onFileChange(e, image.id)}
              />

              <div className="flex-center invisible absolute left-0 top-0 h-full w-full cursor-pointer opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:visible group-hover:bg-underlay group-hover:opacity-100">
                <FaExchangeAlt className="text-3xl" />
              </div>

              <Image
                src={image.file?.preview ?? image.imageUrl}
                alt={image.alt}
                width={1920}
                height={1080}
                className="aspect-video w-full rounded object-cover"
              />
            </div>

            <Input
              value={image.alt}
              onChange={(e) => {
                const newImages = images.map((img) => {
                  if (img.id === image.id) {
                    return { ...img, alt: e.target.value }
                  }
                  return img
                })

                setImages(newImages)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
