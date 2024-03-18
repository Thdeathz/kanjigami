import Image from 'next/image'

export default function PlusBadge() {
  return (
    <Image
      src="/images/plus-badge.svg"
      height="18"
      width="37"
      className="hover:drop-shadow-plus-badge"
      alt="plus-badge"
    />
  )
}
