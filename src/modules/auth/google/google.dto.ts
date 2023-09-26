import Joi from "joi"

export const authenticateGoogleDto = Joi.object({
  body: Joi.object({
    token: Joi.string().required()
  })
}).unknown(true)
