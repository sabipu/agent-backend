import { NextFunction, Request, Response } from 'express'

export const errorHandler = (error: any, request: Request, response: Response, next: NextFunction) => {
  let statusCode = error.code ?? 500
  let additionCode

  if (typeof statusCode !== 'number' || statusCode > 599 || statusCode < 100) {
    additionCode = statusCode
    statusCode = 500
  }

  const message = error.message || error.code || 'Some thing went wrong!'

  return response.status(statusCode).json({
    message,
    additionCode
  })
}