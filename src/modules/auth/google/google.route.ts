import { Router } from 'express'
import { validateDto } from '@/middleware/validateDto'
import { authenticateUser } from './google.controller'
import { authenticateGoogleDto } from './google.dto'

export default function googleRouter(route: Router) {
  route.post('/auth/google', validateDto(authenticateGoogleDto), authenticateUser)
}