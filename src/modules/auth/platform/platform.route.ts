import { Router } from 'express'
import { validateDto } from '@/middleware/validateDto'
import { loginWithPlatform, signupWithPlatform, forgotWithPlatform, resetPasswordWithPlatform } from './platform.controller'
import { loginWithPlatformDto, signupWithPlatformDto, forgotPasswordWithPlatformDto, resetPasswordWithPlatformDto } from './platform.dto'

export default function platformRouter(route: Router) {
  route.post('/auth/signup', validateDto(signupWithPlatformDto), signupWithPlatform)
  route.post('/auth/login', validateDto(loginWithPlatformDto), loginWithPlatform)
  route.post('/auth/forgot', validateDto(forgotPasswordWithPlatformDto), forgotWithPlatform)
  route.post('/auth/reset-password/:tokenId', validateDto(resetPasswordWithPlatformDto), resetPasswordWithPlatform)
}