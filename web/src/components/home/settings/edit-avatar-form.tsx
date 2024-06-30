/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useTransition } from 'react'
import { toast } from 'sonner'

import { IFile } from '@/@types'
import { UserAvatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updateUserAvatar } from '@/server/actions/user'

type Props = {
  currentAvatar?: string
}

export default function EditAvatarForm({ currentAvatar }: Props) {
  const [file, setFile] = useState<IFile | null>(null)
  const [isLoading, startTransition] = useTransition()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (files && files.length > 0) {
      const newFile = files[0] as IFile
      newFile.preview = URL.createObjectURL(newFile)
      setFile(newFile)
    }
  }

  const onSubmit = () => {
    if (!file) return

    startTransition(async () => {
      const formData = new FormData()
      formData.append('file', file as Blob)

      try {
        await updateUserAvatar(formData)

        toast.success('Profile picture updated successfully.')
        setFile(null)
      } catch (error) {
        toast.error('Something went wrong. Please try again later.')
      }
    })
  }

  return (
    <div className="form-item-container">
      <label htmlFor="avatar" className="block font-medium tracking-[0.2px] text-default-link">
        Profile Picture
      </label>
      <div className="mt-1.5 flex items-center gap-4">
        <UserAvatar
          src={file ? file.preview : currentAvatar ?? '/images/default-avatar.jpg'}
          alt="User-avatar"
          className="h-[45px] w-[45px]"
        />

        <div className="flex w-0 shrink grow flex-col gap-2 md:flex-row">
          {file && (
            <div className="flex items-center">
              <Button className="w-min" variant="primary" onClick={onSubmit} isLoading={isLoading}>
                <span className="hidden sm:block">Looks good.</span> Upload & save
              </Button>

              <span className="font-secondary ml-4 inline-block font-medium">or</span>
            </div>
          )}

          <Input
            id="avatar"
            className="w-full sm:w-min"
            type="file"
            accept=".png, .jpg, .jpeg, .webp"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className="pt-2 font-medium tracking-[0.2px] text-default-text-light">
        Image file (png or jpeg) should be less than 1mb. Preferably a square image of at least 150px dimension.
      </div>
    </div>
  )
}
