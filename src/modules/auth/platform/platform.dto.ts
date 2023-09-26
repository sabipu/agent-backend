import Joi from "joi"

export const loginWithPlatformDto = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
}).unknown(true)

export const forgotPasswordWithPlatformDto = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required()
  }).unknown(false)
}).unknown(true)

export const signupWithPlatformDto = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional()
  })
}).unknown(true)
