import { NextFunction, Request, Response } from 'express'
import emailService from './email.service'

export async function sendNewEmail(request: Request, response: Response, next: NextFunction) {
  try {
    const data = request.body
    const sendEmail = await emailService.sendEmail(data)

    response.json(sendEmail)
  } catch (error) {
    next(error)
  }
}
