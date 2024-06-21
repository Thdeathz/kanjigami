import { StatusCodes } from 'http-status-codes'

import { IImageContent, IWordContent, ISaveScoreRequest, IWord, IMultipleChoiceContent } from '@/apis/@types/game'
import prisma from '@/apis/databases/init.prisma'
import notificationService from '@/apis/services/notification.service'
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

  if (gameStack.game.name === 'Multiple Choice') {
    return {
      gameStack,
      words: getMultipleChoiceGameContent(words),
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

const getMultipleChoiceGameContent = (words: IWord[]) => {
  const questions: IMultipleChoiceContent[] = []

  for (let i = 0; i < words.length; i++) {
    const answer = words[i % words.length]
    const wrongAnswers = shuffleArray(words.filter((kanji) => kanji.id !== answer.id)).slice(0, 3)
    const options = shuffleArray([answer, ...wrongAnswers])

    if (Math.random() < 0.3 && answer.image) {
      questions.push({
        answer: {
          id: answer.id,
          hiragana: answer.hiragana,
        },
        options: options.map((option) => ({
          id: option.id,
          hiragana: option.hiragana,
        })),
        question: {
          type: 'image',
          id: answer.id,
          image: answer.image,
        },
      })
      continue
    }

    questions.push({
      answer: {
        id: answer.id,
        hiragana: answer.hiragana,
      },
      options: options.map((option) => ({
        id: option.id,
        hiragana: option.hiragana,
      })),
      question: {
        type: 'word',
        id: answer.id,
        content: answer.content,
      },
    })
  }

  return questions
}

const saveScoreOfflineGame = async (gameStackId: string, userId: string, { score, time, type }: ISaveScoreRequest) => {
  const hightestScore = await prisma.gameLog.findUnique({
    where: {
      gameStackId_userId: {
        gameStackId,
        userId,
      },
    },
    select: {
      id: true,
      point: true,
    },
  })

  if (hightestScore && hightestScore.point >= score)
    return {
      ...hightestScore,
      currentScore: {
        point: score,
        time,
      },
    }

  const currentStack = await prisma.gameStack.findUnique({
    where: {
      id: gameStackId,
    },
    select: {
      id: true,
      stack: {
        select: {
          id: true,
        },
      },
    },
  })

  if (!currentStack) throw new HttpError(StatusCodes.NOT_FOUND, 'Game stack not found')

  const gameLog = await prisma.gameLog.upsert({
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

  await notificationService.recordNewHighScore(gameStackId, userId)

  return { ...gameLog, currentScore: null }
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

const saveScoreOnlineGame = async (roundId: string, userId: string, { score, time, type }: ISaveScoreRequest) => {
  const gameLog = await prisma.gameLog.create({
    data: {
      point: score,
      time,
      type,
      round: {
        connect: {
          id: roundId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  })

  return gameLog
}

export default {
  getGameStackDetail,
  getGameData,
  saveScoreOfflineGame,
  saveScoreOnlineGame,
  getResult,
}
