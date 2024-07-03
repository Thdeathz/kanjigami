import Image from 'next/image'
import { FcIdea } from 'react-icons/fc'

import { Button } from '@/components/ui/button'

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../ui/dialog'

export default function ButtonGuideToPlay() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" className="absolute right-4 top-2 z-[1] shadow-default-brand" tooltip="How to play">
            <FcIdea />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[30rem]">
          <DialogHeader>
            <h2 className="text-2xl font-semibold">How to play</h2>

            <div>
              <h3 className="mt-4 text-lg font-semibold">1. Switch Keyboard to English</h3>
              <p className="mt-2">Make sure your keyboard input is set to English.</p>

              <h3 className="mt-4 text-lg font-semibold">2. Type Enemy Names in Romaji</h3>
              <p className="mt-2">
                Each enemy has a name. Type the enemy&apos;s name in <strong>Romaji</strong>.
              </p>

              <h3 className="mt-4 text-lg font-semibold">3. Enjoy the Game!</h3>
              <Image
                src="https://storage.googleapis.com/kanjigami.pro/screenshot/kanji-shooter-guide.gif"
                alt="Game play"
                width={600}
                height={350}
                className="mt-2"
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="absolute right-[1.9rem] top-5 h-4 w-4 animate-ping rounded-full bg-default-brand opacity-20" />
    </>
  )
}
