import { Request } from 'express'
import { Users } from '../modules/users/users.model'

export type AuthenticationRequest = Request & {
  user?: Users
}