import { NextFunction, Request, Response } from 'express'
import { JwtPayload, verify } from 'jsonwebtoken'
import { AuthenticationRequest } from '@/common/types'
import { RoleNames } from '@/common/constants'
import { UserStatuses } from '@/modules/users/users.constants'
import userService from '@/modules/users/users.service'

export const verifyAccessToken = (roles: (RoleNames | 'GUEST')[]) =>
  async (request: Request, response: Response, next: NextFunction) => {
  try {
    const bearerToken = request.headers.authorization

    if (!bearerToken) {
      if (roles.includes('GUEST')) {
        return next()
      }

      throw {
        code: 401,
        message: 'UnAuthorization'
      }
    }

    const accessToken = bearerToken?.split(' ')[1]

    if (!accessToken) {
      throw {
        code: 401,
        message: 'UnAuthorization'
      }
    }

    const decode: JwtPayload = _verifyToken(accessToken) as JwtPayload

    const user = await userService.findUser({ userId: decode.userId})

    if (!user || user.userStatus !== UserStatuses.ACTIVE) {
      throw {
        code: 401,
        message: 'UnAuthorization'
      }
    }

    (request as AuthenticationRequest).user = user;

    next()
  } catch (error) {
    next(error)
  }
}

function _verifyToken(accessToken: string) {
  try {
    const decode = verify(accessToken, process.env.JWT_SECRET!, { ignoreExpiration: false })

    if (!decode) {
      throw {
        code: 401,
        message: 'InvalidAuthToken'
      }
    }

    return decode
  } catch (error) {
    throw {
      code: 401,
      message: 'InvalidAuthToken'
    }
  }
}