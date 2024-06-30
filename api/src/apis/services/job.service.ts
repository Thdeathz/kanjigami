import { scheduleJob } from 'node-schedule'

import { IStartEventData } from '@/apis/@types/event'
import eventService from '@/apis/services/event.service'
import gameService from '@/apis/services/game.service'
import notificationService from '@/apis/services/notification.service'
import redisService from '@/apis/services/redis.service'
import roundService from '@/apis/services/round.service'
import io from '@/servers/init.socket'

const startNextRound = async (executeTime: Date, event: IStartEventData) => {
  const currentRound = event.rounds.find((round) => round.status === 'ONGOING')
  const nextRound = event.rounds.find((round) => round.status === 'UPCOMING')

  const isValidNextRound =
    nextRound &&
    Math.abs(
      new Date(executeTime).getTime() -
        (new Date(event.startAt).getTime() + nextRound.order * event.duration * 60 * 1000),
    ) <=
      30 * 1000
  const isFinalRoundEnd =
    Math.abs(
      new Date(executeTime).getTime() -
        (new Date(event.startAt).getTime() + event.rounds.length * event.duration * 60 * 1000),
    ) <=
    30 * 1000

  console.log(
    '===> current time, next round start time',
    new Date(executeTime).getTime(),
    new Date(event.startAt).getTime() + (nextRound?.order || 0) * event.duration * 60 * 1000,
    new Date(event.startAt).getTime() + event.rounds.length * event.duration * 60 * 1000,
    isValidNextRound,
    isFinalRoundEnd,
  )

  if (!isValidNextRound && !isFinalRoundEnd) return

  // update current round status in database
  if (currentRound) await roundService.updateRoundStatus(currentRound.id, 'FINISHED')

  // update event status in database if all rounds are finished
  if (!nextRound && currentRound) {
    await eventService.updateEventStatus(event.slug, 'FINISHED')
    await notificationService.recordEventHighestScore(event.id)
    await redisService.del('event', event.slug.toString())
    await redisService.del('event', `${event.slug}:users`)
    io.to(event.slug.toString()).emit('battle:finished', event.slug.toString())
  }

  if (!nextRound) return

  console.log('===> start round now', nextRound.id)

  // get round data
  const roundData = await eventService.getStartRoundData(nextRound.id)

  // update round status in database
  await eventService.updateRoundStatus(nextRound.id, 'ONGOING')

  // get game data
  const gameData = await gameService.getGameData(roundData.gameStack.id)

  await redisService.setex('event', `${event.slug}:${nextRound.id}`, `${event.duration}m`, gameData)

  // update round status in redis
  await redisService.set('event', event.slug.toString(), {
    ...event,
    rounds: [
      ...event.rounds.map((round) => {
        if (round.id === nextRound.id) {
          return {
            ...round,
            status: 'ONGOING',
          }
        }

        if (round.id === currentRound?.id) {
          return {
            ...round,
            status: 'FINISHED',
          }
        }

        return round
      }),
    ],
  })
}

const battleJob = (event: IStartEventData) => {
  // init event job
  scheduleJob(new Date(event.startAt), async (executeTime) => {
    const foundEvent = await eventService.getStartEventData(event.slug)
    if (!foundEvent) return

    console.log('===> start event now', foundEvent.id)

    await eventService.updateEventStatus(event.slug, 'ONGOING')

    await redisService.set('event', event.slug.toString(), foundEvent)

    // start round 1 immediately
    startNextRound(executeTime, foundEvent)
  })

  const eventRoundStartTime = new Date(event.startAt).getTime()
  const eventRoundEndTime = new Date(event.startAt).getTime() + event.rounds.length * event.duration * 60 * 1000

  console.log('===> event time', eventRoundStartTime, eventRoundEndTime)

  // init round job run every 1 minute after event start
  scheduleJob({ start: eventRoundStartTime, end: eventRoundEndTime, rule: `* * * * *` }, async (executeTime) => {
    const foundEvent = await redisService.get<IStartEventData>('event', event.slug.toString())
    if (!foundEvent) return

    // start next round
    await startNextRound(executeTime, foundEvent)
  })
}

export default {
  battleJob,
}
