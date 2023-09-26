import { NextFunction, Request, Response } from "express"
import googleService from "./google.service"

export async function authenticateUser(request: Request, response: Response, next: NextFunction) {
  try {
    const token = await googleService.authenticateUser(request.body)

    return response.json({
      token
    })
  } catch (error) {
    next(error)
  }
}