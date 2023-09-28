import Joi from 'joi'

export const uploadMediaDto = Joi.object({
  headers: Joi.object({
    authorization: Joi.string(),
  }).unknown(true),
  body: Joi.object({
  }).unknown(true)
}).unknown(true)