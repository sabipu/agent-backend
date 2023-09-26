import { NextFunction, Request, Response } from 'express'
import { AuthenticationRequest } from '@/common/types'
import { UserStatuses } from './users.constants'
import usersService from './users.service'

export async function getMe(request: Request, response: Response, next: NextFunction) {
  try {
    const user = (request as AuthenticationRequest).user as any
    return response.json(user)
  } catch (error) {
    next(error)
  }
}

export async function updateProfile(request: Request, response: Response, next: NextFunction) {
  try {
    const user = (request as AuthenticationRequest).user as any

    await usersService.updateUser(user.userId, request.body)

    return response.json(true)
  } catch (error) {
    next(error)
  }
}

export async function getAllUsers(request: Request, response: Response, next: NextFunction) {
  try {
    const users = await usersService.findManyUser(request.query)

    return response.json(users)
  } catch (error) {
    next(error)
  }
}

export async function findUser(request: Request, response: Response, next: NextFunction) {
  try {
    const user = await usersService.findUser(request.params)

    return response.json(user)
  } catch (error) {
    next(error)
  }
}

export async function deActivateUser(request: Request, response: Response, next: NextFunction) {
  try {
    const { userId } = request.params

    await usersService.updateUser(userId, { status: UserStatuses.DEACTIVATED })

    return response.json(true)
  } catch (error) {
    next(error)
  }
}

export async function softDeleteUser(request: Request, response: Response, next: NextFunction) {
  try {
    const { userId } = request.params

    await usersService.deleteUser(userId)

    return response.json(true)
  } catch (error) {
    next(error)
  }
}