import Joi from 'joi'

import { ICreateEventRequest } from '@/apis/@types/event'

export const createNewEventSchema = Joi.object<ICreateEventRequest>({
  title: Joi.string().required(),
  description: Joi.string().required(),
  maxPlayer: Joi.string().required(),
  startAt: Joi.date()
    .required()
    .greater(new Date().getTime() + 1 * 60 * 1000)
    .messages({
      'date.greater': 'Start time must be at least 1 minute in the future',
    }),
  rounds: Joi.array()
    .items(
      Joi.object({
        index: Joi.number().required(),
        gameStackId: Joi.string().required(),
      }),
    )
    .required(),
})
