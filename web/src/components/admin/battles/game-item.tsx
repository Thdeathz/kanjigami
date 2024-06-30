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
      },
      disabled: {
        true: 'pointer-events-none opacity-50',
        false: ''
      }
    },
    defaultVariants: {
      active: false,
      disabled: false
    }
  }
)

interface Props extends VariantProps<typeof gameItemVariants> {
  name: string
  image: string
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export default function GameItem({ name, image, className, active, disabled, onClick }: Props) {
  const handleOnClick = () => {
    if (disabled) return
    if (typeof onClick === 'function') onClick()
  }

  return (
    <button type="button" className={cn(gameItemVariants({ active, disabled }), className)} onClick={handleOnClick}>
      <Image src={image} alt={name} width={400} height={300} className="w-[3rem] rounded-md" />
      <p className="font-medium">{name}</p>
    </button>
  )
}
