import { Prisma } from '@prisma/client'

import { EventsTopUser, IUserStats, TopUser } from '../@types/game-log'
import prisma from '../databases/init.prisma'

const getEventRoundLeaderboard = async (limit: number, eventId?: string) => {
  let top: TopUser[] = []
  if (eventId)
    top = await prisma.$queryRaw<TopUser[]>`
      SELECT 
        "User"."id", 
        "User"."image", 
        "User"."name", 
        SUM("GameLog"."point") as "point",
        AVG("GameLog"."time") as "time"
      FROM "GameLog"
      JOIN "User" ON "GameLog"."userId" = "User"."id"
      WHERE "roundId" IN (
        SELECT id
        FROM "Round"
        WHERE "eventId" = ${eventId}
      )
      GROUP BY "User"."id"
      ORDER BY "point" DESC
      LIMIT ${limit}
    `
  else
    top = await prisma.$queryRaw<TopUser[]>`
      SELECT 
        "User"."id", 
        "User"."image", 
        "User"."name", 
        SUM("GameLog"."point") as "point",
        AVG("GameLog"."time") as "time"
      FROM "GameLog"
      JOIN "User" ON "GameLog"."userId" = "User"."id"
      WHERE "roundId" IS NOT NULL
      GROUP BY "User"."id"
      ORDER BY "point" DESC
      LIMIT ${limit}
    `

  // Convert totalPoints from bigInt to number
  return top.map((user) => ({
    user: {
      id: user.id,
      image: user.image,
      name: user.name,
    },
    point: Number(user.point),
    time: user.time.toFixed(2),
  }))
}

const getAllTimeLeaderboard = async () => {
  const top = await prisma.$queryRaw<TopUser[]>`
    SELECT 
      "User"."id", 
      "User"."image", 
      "User"."name", 
      SUM("GameLog"."point") as "point",
      COUNT("GameLog"."id") as "totalGame"
    FROM "GameLog"
    JOIN "User" ON "GameLog"."userId" = "User"."id"
    GROUP BY "User"."id"
    ORDER BY "point" DESC
    LIMIT 50
  `

  // Convert totalPoints from bigInt to number
  return top.map((user) => ({
    user: {
      id: user.id,
      image: user.image,
      name: user.name,
    },
    point: Number(user.point),
    totalGame: Number(user.totalGame),
  }))
}

const getStacksLeaderboard = async (offset: number, slug?: number) => {
  let top: TopUser[] = []

  if (slug)
    top = await prisma.$queryRaw<TopUser[]>`
      SELECT 
        "User"."id", 
        "User"."image", 
        "User"."name", 
        SUM("GameLog"."point") as "point",
        AVG("GameLog"."time") as "time"
      FROM "GameLog"
      JOIN "User" ON "GameLog"."userId" = "User"."id"
      WHERE "GameLog"."gameStackId" IN (
        SELECT "GameStack"."id"
        FROM "GameStack"
        JOIN "Stack" ON "GameStack"."stackId" = "Stack"."id"
        WHERE "Stack"."slug" = ${slug}
      )
      GROUP BY "User"."id"
      ORDER BY "point" DESC
      LIMIT ${offset}
    `
  else
    top = await prisma.$queryRaw<TopUser[]>`
      SELECT 
        "User"."id", 
        "User"."image", 
        "User"."name", 
        SUM("GameLog"."point") as "point",
        AVG("GameLog"."time") as "time"
      FROM "GameLog"
      JOIN "User" ON "GameLog"."userId" = "User"."id"
      WHERE "GameLog"."gameStackId" IS NOT NULL
      GROUP BY "User"."id"
      ORDER BY "point" DESC
      LIMIT ${offset}
    `

  // Convert totalPoints from bigInt to number
  return top.map((user) => ({
    user: {
      id: user.id,
      image: user.image,
      name: user.name,
    },
    point: Number(user.point),
    time: user.time.toFixed(2),
  }))
}

const getUserStats = async (userId: string) => {
  const eventStats = await prisma.$queryRaw<IUserStats>`
    SELECT 
      SUM("GameLog"."point") as "point",
      AVG("GameLog"."time") as "time",
      COUNT("GameLog"."id") as "totalGame"
    FROM "GameLog"
    WHERE "GameLog"."userId" = ${userId}
    AND "GameLog"."roundId" IS NOT NULL
  `

  const stackStats = await prisma.$queryRaw<IUserStats>`
    SELECT 
      SUM("GameLog"."point") as "point",
      AVG("GameLog"."time") as "time",
      COUNT("GameLog"."id") as "totalGame"
    FROM "GameLog"
    WHERE "GameLog"."userId" = ${userId}
    AND "GameLog"."gameStackId" IS NOT NULL
  `

  return {
    event: {
      point: Number(eventStats[0]?.point),
      time: eventStats[0]?.time?.toFixed(2) ?? 0,
      totalGame: Number(eventStats[0]?.totalGame),
    },
    stack: {
      point: Number(stackStats[0]?.point),
      time: stackStats[0]?.time?.toFixed(2) ?? 0,
      totalGame: Number(stackStats[0]?.totalGame),
    },
  }
}

const getEventsTopUsers = async (eventIds: string[]) => {
  const topUsers = await prisma.$queryRaw<EventsTopUser[]>`
    WITH ranked_users AS (
      SELECT 
        "User"."id", 
        "User"."image", 
        "User"."name", 
        "Round"."eventId",
        SUM("GameLog"."point") as "point",
        AVG("GameLog"."time") as "time",
        ROW_NUMBER() OVER (PARTITION BY "Round"."eventId" ORDER BY SUM("GameLog"."point") DESC) as rank
      FROM "GameLog"
      JOIN "User" ON "GameLog"."userId" = "User"."id"
      JOIN "Round" ON "GameLog"."roundId" = "Round"."id"
      WHERE "Round"."eventId" IN (${Prisma.join(eventIds)})
      GROUP BY "User"."id", "Round"."eventId"
    )
    SELECT * FROM ranked_users WHERE rank <= 3
  `

  // Convert totalPoints from bigInt to number
  return topUsers.map((user) => ({
    user: {
      id: user.id,
      image: user.image,
      name: user.name,
    },
    point: Number(user.point),
    time: user.time.toFixed(2),
    eventId: user.eventId,
  }))
}

export default {
  getEventRoundLeaderboard,
  getAllTimeLeaderboard,
  getStacksLeaderboard,
  getUserStats,
  getEventsTopUsers,
}
