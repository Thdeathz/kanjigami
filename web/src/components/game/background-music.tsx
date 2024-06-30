/* eslint-disable jsx-a11y/media-has-caption */

'use client'

type Props = {
  src: string
}

export default function BackgroundMusic({ src }: Props) {
  return (
    <div>
      <audio autoPlay loop>
        <source src="/audio/background-music.mp3" type="audio/mpeg" />
      </audio>
    </div>
  )
}
