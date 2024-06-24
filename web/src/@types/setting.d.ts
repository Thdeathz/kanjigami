import { IFile } from '.'

export interface IThumbnail {
  id: string
  imageUrl: string
  alt: string
}

export interface IThumbnailSetting {
  id: string
  imageUrl: string
  alt: string
  file?: IFile
}
