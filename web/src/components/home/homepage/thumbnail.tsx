'use client'

import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

import { IThumbnail } from '@/@types/setting'
import HomeSection from '@/components/home/homepage/home-section'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

type Props = {
  thumbnails?: IThumbnail[]
}

export default function Thumbnail({ thumbnails }: Props) {
  if (!thumbnails) return null

  return (
    <HomeSection title="Welcome to ⚔️ 漢字ガミ" description="Let's explore this website and learn a lot of kanji">
      <Carousel
        className="w-full rounded-[1.25rem] border-2 border-border-1 p-3"
        opts={{
          loop: true,
          dragFree: false
        }}
        plugins={[
          Autoplay({
            delay: 3000
          })
        ]}
      >
        <CarouselContent>
          {thumbnails.map((image) => (
            <CarouselItem key={image.id} className="basis-full rounded-[1.25rem]">
              <Image
                src={image.imageUrl}
                alt={image.alt}
                width={1920}
                height={1080}
                priority
                className="aspect-video w-full rounded-lg object-cover lg:h-[30rem]"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </HomeSection>
  )
}
