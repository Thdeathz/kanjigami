/* eslint-disable no-case-declarations */
import React, { useCallback, useEffect, useRef } from 'react'
import { useEventListener } from 'usehooks-ts'

import { IKanjiShooterContent } from '@/@types/game'

import Game from './entities/game'

type PropsType = {
  gameContent: IKanjiShooterContent[]
  handleCalculateScore: () => void
  size: {
    width: number
    height: number
  }
  game: Game | null
  setGame: React.Dispatch<React.SetStateAction<Game | null>>
}

const KanjiShooterGameContent = ({ gameContent, handleCalculateScore, size, game, setGame }: PropsType) => {
  const inputEl = useRef<HTMLInputElement>(null)
  const canvasEl = useRef<HTMLCanvasElement>(null)

  const animationIdRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)

  const initGame = useCallback(
    async (canvas: HTMLCanvasElement, words: IKanjiShooterContent[]) => {
      const ctx = canvas.getContext('2d')
      if (!ctx || !inputEl.current) return

      ctx.strokeStyle = 'white'
      ctx.lineWidth = 2
      ctx.font = '20px Arial'
      ctx.fillStyle = 'white'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      setGame(new Game(canvas, words, inputEl.current))
    },
    [setGame]
  )

  const animate = (timeStamp: number) => {
    const canvas = canvasEl.current
    const ctx = canvasEl.current?.getContext('2d')
    if (!ctx || !canvas || !game) return

    const deltaTime = timeStamp - lastTimeRef.current
    lastTimeRef.current = timeStamp

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    animationIdRef.current = requestAnimationFrame(animate)
    game.render(ctx, deltaTime, animationIdRef.current, handleCalculateScore)
  }

  useEffect(() => {
    animationIdRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationIdRef.current)
  })

  useEffect(() => {
    if (canvasEl.current) initGame(canvasEl.current, [...gameContent])
  }, [])

  useEventListener('keydown', (e: KeyboardEvent) => {
    if (!inputEl.current || e.key === ' ') return

    switch (e.key) {
      case 'Enter':
        const hasEnemy = game?.enemyPool.filter(
          (enemy) => !enemy.free && enemy.keyword && inputEl.current?.value === enemy.keyword.romaji
        )

        if (!hasEnemy || hasEnemy.length === 0) {
          game?.player.hit(1)
          inputEl.current.value = ''
          return
        }

        let nearestEnemy = null
        if (hasEnemy.length > 1) {
          nearestEnemy = hasEnemy.reduce((prev, curr) => {
            const prevDistance = Math.hypot(
              game?.planet.position.x ?? 0 - prev.position.x,
              game?.planet.position.y ?? 0 - prev.position.y
            )
            const currDistance = Math.hypot(
              game?.planet.position.x ?? 0 - curr.position.x,
              game?.planet.position.y ?? 0 - curr.position.y
            )

            return prevDistance < currDistance ? prev : curr
          })
        } else {
          ;[nearestEnemy] = hasEnemy
        }

        nearestEnemy.color = 'red'
        game?.player.shoot(nearestEnemy)

        inputEl.current.value = ''
        break
      case 'Backspace':
        inputEl.current.value = ''
        break
      default:
        if (inputEl.current.value.length > 20) {
          inputEl.current.value = e.key
        } else {
          inputEl.current.value += e.key
        }
        break
    }
  })

  return (
    <div className="relative h-max w-max">
      <canvas
        ref={canvasEl}
        width={size.width}
        height={size.height}
        id="kanji-shooter-game"
        className="rounded-md shadow"
      />

      <input
        ref={inputEl}
        type="text"
        className="text-text-dark absolute top-4 z-10 w-[20rem] border-b-2 text-2xl font-medium backdrop-blur-md"
        style={{
          left: 'calc(50% - 10rem)'
        }}
      />
    </div>
  )
}

export default KanjiShooterGameContent
