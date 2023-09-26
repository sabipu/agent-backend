import { NextFunction, Request, Response } from "express"
import tokensService from "./tokens.service"

export async function validateOTPToken(request: Request, response: Response, next: NextFunction) {
  try {
    const { tokenId } = request.params
    const { otp, email } = request.body
    const accessToken = await tokensService.validateEmailOTPToken(tokenId, { otp, email })

    return response.json({
      accessToken
    })
  } catch (error) {
    next(error)
  }
}

export async function validateResetPasswordOTPToken(request: Request, response: Response, next: NextFunction) {
  try {
    const { tokenId } = request.params
    const { otp, email } = request.body
    const accessToken = await tokensService.validateResetPasswordOTPToken(tokenId, { otp, email })

    return response.json({
      accessToken
    })
  } catch (error) {
    next(error)
  }
}