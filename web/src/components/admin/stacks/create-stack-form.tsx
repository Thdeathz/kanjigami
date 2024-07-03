'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { ICreateStackRequest, ICreateWordRequest } from '@/@types/stack'
import SectionTitle from '@/components/admin/section-title'
import NewWordForm from '@/components/admin/stacks/new-word-form'
import NewWordsList from '@/components/admin/stacks/new-words-list'
import StackDetailsForm from '@/components/admin/stacks/stack-details-form'
import { Button } from '@/components/ui/button'
import { SectionDivider } from '@/components/ui/separator'
import useInvalidateTag from '@/hooks/use-invalidate-tag'
import useUploadImage from '@/hooks/use-upload-image'
import { StackDetailsSchema } from '@/schema/admin/stack-schema'
import { adminCreateStack } from '@/server/actions/stack'

type Props = {
  currentStack?: ICreateStackRequest | null
}

export default function CreateStackForm({ currentStack }: Props) {
  const form = useForm<z.infer<typeof StackDetailsSchema>>({
    resolver: zodResolver(StackDetailsSchema),
    defaultValues: {
      name: currentStack?.name ?? '',
      description: currentStack?.description ?? '',
      topic: currentStack?.topic ?? ''
    }
  })

  const [image, handleFileChange, resetImage] = useUploadImage()
  const [words, setWords] = useState<ICreateWordRequest[]>(currentStack?.words ?? [])
  const { invalidateTag } = useInvalidateTag()
  const [isPending, startTransition] = useTransition()

  const onSubmit = (data: z.infer<typeof StackDetailsSchema>) => {
    if (!image) {
      toast.error('Please upload stack thumbnail')
      return
    }

    if (words.length === 0) {
      toast.error('Please add words')
      return
    }

    startTransition(async () => {
      try {
        const formData = new FormData()

        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('topic', data.topic)
        formData.append('images', image)
        words.forEach((word, index) => {
          formData.append(`words[${index}][content]`, word.content)
          formData.append(`words[${index}][hiragana]`, word.hiragana)
          formData.append(`words[${index}][romaji]`, word.romaji)
          formData.append(`words[${index}][meaning]`, word.meaning)
          formData.append('images', word.image)
          word.examples.forEach((example, exampleIndex) => {
            formData.append(`words[${index}][examples][${exampleIndex}][content]`, example.content)
            formData.append(`words[${index}][examples][${exampleIndex}][romaji]`, example.romaji)
            formData.append(`words[${index}][examples][${exampleIndex}][meaning]`, example.meaning)
          })
        })

        await adminCreateStack(formData)

        invalidateTag(['stacks'])
        toast.success('Stack created successfully')
        form.reset()
        resetImage()
        setWords([])
      } catch (error) {
        toast.error('Failed to create stack. Please try again.')
      }
    })
  }

  return (
    <div className="mx-auto max-w-[80rem] space-y-6">
      <SectionDivider title="Stack Details" />

      <div className="grid grid-cols-2 gap-12">
        <div>
          <SectionTitle title="Stack thumbnail" />

          <Image
            src={image?.preview ?? currentStack?.image ?? '/images/lock.png'}
            alt="new-stack-thumbnail"
            width={400}
            height={300}
            className="aspect-4/3 w-full rounded-md object-cover"
          />
        </div>

        <StackDetailsForm form={form} handleFileChange={handleFileChange} onSubmit={onSubmit} />
      </div>

      <SectionDivider title="Words" />

      <div className="grid grid-cols-2 gap-12">
        <div>
          <SectionTitle
            title={
              <>
                <p>Available word</p>
                <p>Note: Select word to edit, unselect to add new word.</p>
              </>
            }
          />

          <div className="flex flex-wrap gap-4 rounded-md border-2 border-dashed border-border p-3">
            <NewWordsList words={words} />
          </div>
        </div>

        <div>
          <SectionTitle title="Add new word" />

          <NewWordForm setWords={setWords} />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button variant="danger" type="button" link="/admin/stacks">
          Cancel
        </Button>

        <Button variant="primary" type="submit" form="stack-detail-form" isLoading={isPending}>
          Add new
        </Button>
      </div>
    </div>
  )
}
