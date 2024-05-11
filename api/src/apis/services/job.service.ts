import { scheduleJob } from 'node-schedule'

import { IStartEventData } from '@/apis/@types/event'
import eventService from '@/apis/services/event.service'
import gameService from '@/apis/services/game.service'
import redisService from '@/apis/services/redis.service'

const startNextRound = async (event: IStartEventData) => {
  const currentRound = event.rounds.find((round) => round.status === 'ONGOING')
  const nextRound = event.rounds.find((round) => round.status === 'UPCOMING')

  // update current round status in database
  if (currentRound) await eventService.updateRoundStatus(currentRound.id, 'FINISHED')

  // update event status in database if all rounds are finished
  if (!nextRound && currentRound) {
    await eventService.updateEventStatus(event.id, 'FINISHED')
    await redisService.del('event', event.id)
  }

  if (!nextRound) return

  console.log('===> start round now', nextRound.id)

  // get round data
  const roundData = await eventService.getStartRoundData(nextRound.id)

  // update round status in database
  await eventService.updateRoundStatus(nextRound.id, 'ONGOING')

  // get game data
  const gameData = await gameService.getGameData(roundData.gameStack.id)

  await redisService.setex('event', `${event.id}:${nextRound.id}`, '1m', gameData)

  // update round status in redis
  await redisService.set('event', event.id, {
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
  scheduleJob(new Date(event.startAt), async () => {
    const foundEvent = await eventService.getStartEventData(event.id)
    if (!foundEvent) return

    console.log('===> start event now', foundEvent.id)

    await eventService.updateEventStatus(event.id, 'ONGOING')

    await redisService.set('event', event.id, foundEvent)

    // start round 1 immediately
    startNextRound(foundEvent)
  })

  const eventRoundStartTime = new Date(event.startAt).getTime()
  const eventRoundEndTime = new Date(event.startAt).getTime() + (event.rounds.length + 1) * 1 * 60 * 1000

  console.log('===> event time', eventRoundStartTime, eventRoundEndTime)

  // init round job run every 1 minute after event start
  scheduleJob({ start: eventRoundStartTime, end: eventRoundEndTime, rule: '*/1 * * * *' }, async () => {
    const foundEvent = await redisService.get<IStartEventData>('event', event.id)
    if (!foundEvent) return

    // start next round
    await startNextRound(foundEvent)
  })
}

export default {
  battleJob,
}
