'use client'

import React from 'react'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import { useStep } from 'usehooks-ts'

import { IMultipleChoiceGameContent } from '@/@types/game'
import { Button } from '@/components/ui/button'
import { Panel } from '@/components/ui/card'

import QuestionPanel from './QuestionPanel'

type Props = {
  gameContent: IMultipleChoiceGameContent[]
  onCalculateScore: () => void
  onSelectAnswer: (answer: number, question: number) => void
}

export default function MultipleChoiceGameContent({ gameContent, onCalculateScore, onSelectAnswer }: Props) {
  const [currentStep, { canGoToPrevStep, canGoToNextStep, goToNextStep, goToPrevStep, setStep }] = useStep(
    gameContent.length
  )

  const onChangeStep = (step: number) => {
    setStep(step)
  }

  return (
    <div className="flex h-content w-full flex-col gap-6">
      <QuestionPanel questionIndex={currentStep - 1} data={gameContent[currentStep - 1]} onSelect={onSelectAnswer} />

      <Panel wrapperClass="w-min mx-auto" className="flex-center gap-4 p-4">
        <Button disabled={!canGoToPrevStep} className="flex-center gap-2 rounded-md" onClick={goToPrevStep}>
          <FaArrowLeftLong />
        </Button>

        {/* <Slider className="w-full grow" min={1} max={gameContent.length} value={currentStep} onChange={onChangeStep} /> */}

        {currentStep === gameContent.length ? (
          <Button variant="primary" className="flex-center gap-2 rounded-md" onClick={onCalculateScore}>
            Submit
          </Button>
        ) : (
          <Button
            disabled={!canGoToNextStep}
            variant="primary"
            className="flex-center gap-2 rounded-md"
            onClick={goToNextStep}
          >
            Next Question <FaArrowRightLong />
          </Button>
        )}
      </Panel>
    </div>
  )
}
