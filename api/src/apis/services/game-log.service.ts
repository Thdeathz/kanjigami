import { TopUser } from '../@types/game-log'
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

export default {
  getEventRoundLeaderboard,
  getAllTimeLeaderboard,
  getStacksLeaderboard,
}
