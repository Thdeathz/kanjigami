import Image from 'next/image'

type Props = {
  size?: 'normal' | 'large'
}

export default function PlusBadge({ size = 'normal' }: Props) {
  const width = size === 'large' ? 49 : 37
  const height = size === 'large' ? 24 : 18

  return (
    <Image
      src="/images/plus-badge.svg"
      height={height}
      width={width}
      className="hover:drop-shadow-plus-badge"
      alt="plus-badge"
    />
  )
}
