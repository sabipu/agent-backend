import joi from "joi"

export const loginWithPlatformDto = joi.object({
  body: joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
  })
}).unknown(true)

export const forgotPasswordWithPlatformDto = joi.object({
  body: joi.object({
    email: joi.string().email().required()
  }).unknown(false)
}).unknown(true)

export const resetPasswordWithPlatformDto = joi.object({
  params: joi
  .object({
    tokenId: joi.string().required(),
  }).unknown(false),
  body: joi.object({
    password: joi.string().required(),
    password2: joi.string().required(),
  }).unknown(false)
}).unknown(true)

export const signupWithPlatformDto = joi.object({
  body: joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    firstName: joi.string().optional(),
    lastName: joi.string().optional()
  })
}).unknown(true)
