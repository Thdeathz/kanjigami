import { BattleStatus } from '@prisma/client'

import prisma from '../databases/init.prisma'

const updateRoundStatus = async (roundId: string, status: BattleStatus) => {
  return await prisma.round.update({
    where: {
      id: roundId,
    },
    data: {
      status,
    },
  })
}

export default {
  updateRoundStatus,
}
