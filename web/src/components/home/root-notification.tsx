'use client'

import AutoScroll from 'embla-carousel-auto-scroll'
import Link from 'next/link'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useGetNotificationQuery } from '@/data/notification'

import Loading from '../loading'
import { UserAvatar } from '../ui/avatar'

export default function RootNotification() {
  const { data: notifications, isLoading } = useGetNotificationQuery()

  if (isLoading) return <Loading className="text-2xl" />

  if (!notifications) return null

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
        {notifications.map((noti) => (
          <CarouselItem key={noti.id} className="">
            <div className="flex items-center justify-start gap-2 rounded-2xl border-2 border-border-1 py-2 pe-4 ps-2 text-sm font-medium text-default-text-light">
              <UserAvatar className="h-[24px] w-[24px]" src={noti.user.image} alt={noti.user.name} />

              <p className="text-default-heading">{noti.user.name}</p>

              <p>
                {noti.action}{' '}
                <Link className="text-default-link" href={`/stacks/${noti.link}`}>
                  #{noti.link}
                </Link>{' '}
                with {noti.point} point 🚀.
              </p>

              <p className="text-default-text-lightest">{noti.createdAt}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
