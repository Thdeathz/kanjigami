import { VariantProps, cva } from 'class-variance-authority'
import Image from 'next/image'

import { cn } from '@/lib/utils'

const gameItemVariants = cva(
  'flex items-center gap-2 w-full cursor-pointer border rounded-md p-1 transition-all duration-200 hover:bg-primary-title-light',
  {
    variants: {
      active: {
        true: 'border-default-green',
        false: 'border-transparent'
      }
    },
    defaultVariants: {
      active: false
    }
  }
)

interface Props extends VariantProps<typeof gameItemVariants> {
  name: string
  image: string
  className?: string
  onClick?: () => void
}

export default function GameItem({ name, image, className, active, onClick }: Props) {
  const handleOnClick = () => {
    if (typeof onClick === 'function') onClick()
  }

  return (
    <button type="button" className={cn(gameItemVariants({ active }), className)} onClick={handleOnClick}>
      <Image src={image} alt={name} width={400} height={300} className="w-[3rem] rounded-md" />
      <p className="font-medium">{name}</p>
    </button>
  )
}
