import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

export const validateDto = (schemaDto: Joi.ObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = schemaDto.validate(req, { abortEarly: false })

  if (error) {
    return res.status(400).json({ message: error.message })
  }

  req.body = value.body
  req.params = value.params
  req.query = value.query
  req.headers = value.headers

  next()
}