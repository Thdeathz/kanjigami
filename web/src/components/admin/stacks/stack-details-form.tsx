import React from 'react'

import { IFile } from '@/@types'
import { FormField, FormInput } from '@/components/ui/form'

type Props = {
  setImage: React.Dispatch<React.SetStateAction<IFile | null>>
}

export default function StackDetailsForm({ setImage }: Props) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (files && files.length > 0) {
      const newFile = files[0]
      const reader = new FileReader()

      reader.onload = () => {
        setImage({ ...newFile, preview: reader.result as string })
      }

      reader.readAsDataURL(newFile)
    }
  }

  return (
    <form>
      <FormField
        // control={form.control}
        name="name"
        render={({ field }) => <FormInput label="Name" {...field} placeholder="An awesome stack" />}
      />

      <FormField name="description" render={({ field }) => <FormInput label="Description" {...field} />} />

      <FormField name="topic" render={({ field }) => <FormInput label="Topic" {...field} />} />

      <FormField
        name="thumbnail"
        render={() => (
          <FormInput
            label="Thumbnail"
            type="file"
            className="flex flex-col"
            inputClass="w-min"
            accept=".png,.jpg,.jpeg"
            onChange={handleFileChange}
          />
        )}
      />
    </form>
  )
}
