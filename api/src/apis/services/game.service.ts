import { StatusCodes } from 'http-status-codes'

import { IImageContent, IWordContent, ISaveScoreRequest, IWord } from '@/apis/@types/game'
import prisma from '@/apis/databases/init.prisma'
import { shuffleArray } from '@/apis/utils/array'
import HttpError from '@/apis/utils/http-error'
import { randomPick } from '@/apis/utils/pick'

const getGameStackDetail = async (id: string) => {
  return await prisma.gameStack.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      stack: {
        select: {
          id: true,
          slug: true,
          name: true,
        },
      },
      game: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      numberOfWords: true,
      timeLimit: true,
    },
  })
}

const getGameData = async (id: string) => {
  const gameStack = await getGameStackDetail(id)

  if (!gameStack) throw new HttpError(StatusCodes.NOT_FOUND, 'Game stack not found')

  const stackId = gameStack.stack.id

  const itemCount = await prisma.word.count({
    where: {
      stacks: {
        some: {
          id: stackId,
        },
      },
    },
  })
  const skip = Math.max(0, Math.floor(Math.random() * itemCount) - gameStack.numberOfWords)
  const orderBy = randomPick(['id', 'content', 'romaji'])
  const orderDir = randomPick(['asc', 'desc'])

  const words = await prisma.word.findMany({
    take: gameStack.numberOfWords,
    skip,
    orderBy: {
      [orderBy]: orderDir,
    },
    where: {
      stacks: {
        some: {
          id: gameStack.stack.id,
        },
      },
    },
    select: {
      id: true,
      content: true,
      hiragana: true,
      romaji: true,
      image: true,
    },
  })

  if (gameStack.game.name === 'Kanji Shooter') {
    return {
      gameStack,
      words: getKanjiShooterGameContent(words),
    }
  }

  if (gameStack.game.name === 'Blind Flip Card') {
    return {
      gameStack,
      words: shuffleArray(getFlipCardGameContent(words)),
    }
  }

  return {
    gameStack,
    words,
  }
}

const getKanjiShooterGameContent = (words: IWord[]) =>
  words.map((word) => ({
    id: word.id,
    content: word.content,
    romaji: word.romaji,
  }))

const getFlipCardGameContent = (words: IWord[]) =>
  words.reduce((data: (IImageContent | IWordContent)[], item: IWord) => {
    return [
      ...data,
      {
        type: 'image',
        id: item.id,
        image: item.image,
        hiragana: item.hiragana,
        isVisible: true,
      } as IImageContent,
      {
        type: 'word',
        id: item.id,
        content: item.content,
        isVisible: true,
      } as IWordContent,
    ]
  }, [])

const saveScore = async (gameStackId: string, userId: string, { score, time, type }: ISaveScoreRequest) => {
  return await prisma.gameLog.upsert({
    where: {
      gameStackId_userId: {
        gameStackId,
        userId,
      },
    },
    update: {
      point: score,
      time,
    },
    create: {
      point: score,
      time,
      type,
      gameStack: {
        connect: {
          id: gameStackId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  })
}

const getResult = async (gameLogId: string) => {
  return await prisma.gameLog.findUnique({
    where: {
      id: gameLogId,
    },
    select: {
      id: true,
      point: true,
      time: true,
      type: true,
      gameStack: {
        select: {
          id: true,
          stack: {
            select: {
              id: true,
              name: true,
            },
          },
          game: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  })
}

export default {
  getGameStackDetail,
  getGameData,
  saveScore,
  getResult,
}
