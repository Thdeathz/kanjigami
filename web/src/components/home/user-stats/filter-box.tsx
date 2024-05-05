'use client'

import { VariantProps, cva } from 'class-variance-authority'
import Link from 'next/link'
import { FaCaretDown } from 'react-icons/fa'

import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useGetUserPlayedBattlesQuery } from '@/data/battle'
import { cn } from '@/lib/utils'

type Props = {
  currentBattle?: string
}

const filterItemVariants = cva('block w-52 truncate whitespace-nowrap  transition-all hover:underline', {
  variants: {
    active: {
      true: 'text-secondary-btn-text',
      false: 'text-default-text-light'
    }
  },
  defaultVariants: {
    active: false
  }
})

interface FilterItemProps extends VariantProps<typeof filterItemVariants> {
  href: string
  name: string
}

function FilterItem({ name, href, active }: FilterItemProps) {
  return (
    <Link href={href} className={cn(filterItemVariants({ active }))}>
      {name}
    </Link>
  )
}

export default function FilterBox({ currentBattle }: Props) {
  const { data: battles, isLoading } = useGetUserPlayedBattlesQuery()

  const activeBattle = battles?.find((battle) => battle.slug === Number(currentBattle)) ?? battles?.[0]

  if (isLoading) return <Loading className="text-2xl" />

  if (!battles) return null

  return (
    <div className="mt-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <span>{activeBattle?.name ?? 'Not found'}</span>

            <FaCaretDown />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="center" className="p-0">
          <ScrollArea className="h-64 px-5 py-2">
            <div className="space-y-1.5">
              {battles.map((battle) => (
                <FilterItem
                  key={battle.id}
                  href={`?battle=${battle.slug}`}
                  name={`Battle #${battle.slug} - ${battle.name}`}
                  active={activeBattle?.slug === battle.slug}
                />
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  )
}
