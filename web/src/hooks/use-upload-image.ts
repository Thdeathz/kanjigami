import React, { useState } from 'react'

import { IFile } from '@/@types'

export default function useUploadImage() {
  const [image, setImage] = useState<IFile | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (files && files.length > 0) {
      const file = files[0] as IFile
      file.preview = URL.createObjectURL(file)

      setImage(file)
    }
  }

  const resetImage = () => {
    setImage(null)
  }

  return [image, handleFileChange, resetImage] as const
}
