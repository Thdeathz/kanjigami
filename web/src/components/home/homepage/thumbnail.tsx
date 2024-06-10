'use client'

import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

import HomeSection from '@/components/home/homepage/home-section'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

const imagesList = [
  {
    id: '1',
    src: 'https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/demo.jpeg?alt=media&token=f05ecb5f-45d9-4cd0-983c-49f1436f131f',
    alt: 'Random image 1'
  },
  {
    id: '2',
    src: 'https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/ec3874d70132bbbc558dd791f4924166.jpg?alt=media&token=fba76343-48c1-4d19-8bcd-435176dc5fbc',
    alt: 'Random image 2'
  },
  {
    id: '3',
    src: 'https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/005347bc119fd9ca954d3373a72fa240.jpg?alt=media&token=c32d888d-ae0a-41f7-9f81-51f52d35a97e',
    alt: 'Random image 3'
  },
  {
    id: '4',
    src: 'https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/c3ba2edb45f9a8b7a99c6c1d233371ea.jpg?alt=media&token=2ac6fc39-f1ab-4f79-9583-3dfaa8ab521b',
    alt: 'Random image 4'
  },
  {
    id: '5',
    src: 'https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/c346036ece7e875d6a92f743b06a40db.jpg?alt=media&token=953a76f9-ad24-44a4-8330-0145eafe0a2f',
    alt: 'Random image 5'
  }
]

export default function Thumbnail() {
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
          {imagesList.map((image) => (
            <CarouselItem key={image.id} className="basis-full rounded-[1.25rem]">
              <Image
                src={image.src}
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
