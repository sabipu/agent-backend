import joi from 'joi'

export const validateOTPTokenDto = joi
  .object({
    params: joi
      .object({
        tokenId: joi.string().required(),
      })
      .unknown(false),
    body: joi
      .object({
        otp: joi.number().required(),
        email: joi.string().required()
      })
      .unknown(false),
  })
  .unknown(true)
