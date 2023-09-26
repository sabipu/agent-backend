import Joi from 'joi'

export const sendNewEmailDto = Joi.object({
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(true),
  body: Joi.object({
    to: Joi.string().email().required(),
    template: Joi.string().required(),
    data: Joi.any()

  }).unknown(false)
}).unknown(true)