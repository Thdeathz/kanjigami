'use client'

import AutoScroll from 'embla-carousel-auto-scroll'
import Link from 'next/link'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

import { UserAvatar } from '../ui/avatar'

const notiData = [
  {
    id: '1',
    user: {
      name: 'Kantan kanji 1',
      avatar: '1'
    },
    meta: {
      point: 155,
      stack: {
        id: '1'
      },
      type: 'record'
    }
  },
  {
    id: '2',
    user: {
      name: 'Kantan kanji 2',
      avatar: '2'
    },
    meta: {
      point: 255,
      stack: {
        id: '2'
      },
      type: 'record'
    }
  },
  {
    id: '3',
    user: {
      name: 'Kantan kanji 3',
      avatar: '3'
    },
    meta: {
      point: 355,
      stack: {
        id: '3'
      },
      type: 'record'
    }
  },
  {
    id: '4',
    user: {
      name: 'Kantan kanji 4',
      avatar: '4'
    },
    meta: {
      point: 455,
      stack: {
        id: '4'
      },
      type: 'record'
    }
  },
  {
    id: '5',
    user: {
      name: 'Kantan kanji 5',
      avatar: '5'
    },
    meta: {
      point: 555,
      stack: {
        id: '5'
      },
      type: 'record'
    }
  }
]

export default function RootNotification() {
  return (
    <Carousel
      className="root-noti w-full"
      opts={{
        loop: true,
        dragFree: false
      }}
      plugins={[
        AutoScroll({
          speed: 1,
          startDelay: 100,
          stopOnMouseEnter: true,
          stopOnInteraction: false
        })
      ]}
    >
      <CarouselContent>
        {notiData.map((noti) => (
          <CarouselItem key={noti.id} className="">
            <div className="flex items-center justify-start gap-2 rounded-2xl border-2 border-border-1 py-2 pe-4 ps-2 text-sm font-medium text-default-text-light">
              <UserAvatar className="h-[24px] w-[24px]" src="/images/default-avatar.jpg" alt={noti.user.name} />

              <p className="text-default-heading">{noti.user.name}</p>

              <p>
                broke own record on{' '}
                <Link className="text-default-link" href="/">
                  #{noti.meta.stack.id}
                </Link>{' '}
                with {noti.meta.point} point.
              </p>

              <p className="text-default-text-lightest">20 minutes ago</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
