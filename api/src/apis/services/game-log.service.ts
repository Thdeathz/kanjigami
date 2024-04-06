import { IUserStats, TopUser } from '../@types/game-log'
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

const getStacksLeaderboard = async (stackId?: string) => {
  let top: TopUser[] = []
  console.log(stackId)
  if (stackId)
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
        SELECT id
        FROM "GameStack"
        WHERE "stackId" = ${stackId}
      )
      GROUP BY "User"."id"
      ORDER BY "point" DESC
      LIMIT 50
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

export default {
  getEventRoundLeaderboard,
  getAllTimeLeaderboard,
  getStacksLeaderboard,
  getUserStats,
}
