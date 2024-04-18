import { BattleStatus, BattleType } from '@/@types/battle'

const STATUS: {
  [key in BattleStatus]: BattleStatus
} = {
  ONGOING: 'ONGOING',
  UPCOMING: 'UPCOMING',
  FINISHED: 'FINISHED'
}

const TYPE: {
  [key in BattleType]: BattleType
} = {
  GOFT: 'GOFT',
  TIMEATTACK: 'TIMEATTACK'
}

export default {
  STATUS,
  TYPE
}
