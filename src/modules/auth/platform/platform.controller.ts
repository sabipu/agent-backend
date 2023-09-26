import { NextFunction, Request, Response } from "express"
import platformService from "./platform.service"

export async function loginWithPlatform(request: Request, response: Response, next: NextFunction) {
  try {
    const accessToken = await platformService.loginWithPlatform(request.body)

    return response.json({
      accessToken
    })
  } catch (error) {
    next(error)
  }
}

export async function signupWithPlatform(request: Request, response: Response, next: NextFunction) {
  try {
    const optToken = await platformService.signupWithPlatform(request.body)

    return response.json({
      tokenId: optToken.tokenId
    })
  } catch (error) {
    next(error)
  }
}

export async function forgotWithPlatform(request: Request, response: Response, next: NextFunction) {
  try {
    const { email } = request.body
    const optToken = await platformService.forgotWithPlatform(email)

    return response.json({
      tokenId: optToken.tokenId
    })
  } catch (error) {
    next(error)
  }
}