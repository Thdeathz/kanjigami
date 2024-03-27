/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'

import { IFile } from '@/@types'
import { UserAvatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function EditAvatarForm() {
  const [file, setFile] = useState<IFile | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (files && files.length > 0) {
      const newFile = files[0]
      const reader = new FileReader()

      reader.onload = () => {
        setFile({ ...newFile, preview: reader.result as string })
      }

      reader.readAsDataURL(newFile)
    }
  }

  return (
    <div className="form-item-container">
      <label htmlFor="avatar" className="block font-medium tracking-[0.2px] text-default-link">
        Profile Picture
      </label>
      <div className="mt-1.5 flex items-center gap-4">
        <UserAvatar
          src={file ? file.preview : '/images/default-avatar.jpg'}
          alt="thdeathz"
          className="h-[45px] w-[45px]"
        />

        {file && (
          <div>
            <Button className="w-min" variant="primary">
              Looks good. Upload & save
            </Button>

            <span className="font-secondary ml-4 font-medium">or</span>
          </div>
        )}

        <Input id="avatar" className="w-min" type="file" onChange={handleFileChange} />
      </div>
      <div className="pt-2 font-medium tracking-[0.2px] text-default-text-light">
        Image file (png or jpeg) should be less than 1mb. Preferably a square image of at least 150px dimension.
      </div>
    </div>
  )
}
