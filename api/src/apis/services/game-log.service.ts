import { TopUser } from '../@types/game-log'
import prisma from '../databases/init.prisma'

const getEventRoundLeaderboard = async (eventId: string, limit: number) => {
  const top = await prisma.$queryRaw<TopUser[]>`
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
}
