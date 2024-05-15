'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { IFile } from '@/@types'
import SectionTitle from '@/components/admin/section-title'
import NewWordForm from '@/components/admin/stacks/new-word-form'
import NewWordInput from '@/components/admin/stacks/new-word-input'
import StackDetailsForm from '@/components/admin/stacks/stack-details-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { SectionDivider } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function CreateStackForm() {
  const form = useForm()

  const [image, setImage] = useState<IFile | null>(null)

  return (
    <Form {...form}>
      <div className="mx-auto w-[80rem] space-y-6">
        <SectionDivider title="Stack Details" />

        <div className="grid grid-cols-2 gap-12">
          <div>
            <SectionTitle title="Stack thumbnail" />

            <Image
              src={image?.preview ?? '/images/lock.png'}
              alt="new-stack-thumbnail"
              width={400}
              height={300}
              className="aspect-4/3 w-full rounded-md object-cover"
            />
          </div>

          <StackDetailsForm setImage={setImage} />
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

            <div className="rounded-md border-2 border-dashed border-border p-3">
              <p className="font-medium opacity-60">No word has been added.</p>
            </div>
          </div>

          <div>
            <SectionTitle title="Add new word" />

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All in one</TabsTrigger>
                <TabsTrigger value="step">Step by step</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <NewWordInput />
              </TabsContent>
              <TabsContent value="step">
                <NewWordForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button variant="danger" type="button" link="/admin/stacks">
            Cancel
          </Button>

          <Button variant="primary" type="submit" disabled>
            Add new
          </Button>
        </div>
      </div>
    </Form>
  )
}
