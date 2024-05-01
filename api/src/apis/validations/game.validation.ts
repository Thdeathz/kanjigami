import Joi from 'joi'

import { ISaveScoreRequest } from '@/apis/@types/game'

export const saveScoreSchema = Joi.object<ISaveScoreRequest>({
  score: Joi.number().required(),
  time: Joi.number().required(),
  type: Joi.string().required(),
})
