import joi from 'joi'
import { SortDirection } from '../../common/constant'
import { UserStatuses, UserTypes } from './users.constants'
import { UserSortBy } from './users.type'

export const updateProfileDto = joi
  .object({
    headers: joi
      .object({
        authorization: joi.string().required(),
      }).unknown(true),
    body: joi
      .object({
        firstName: joi.string(),
        lastName: joi.string(),
        avatar: joi.string(),
        address: joi.string(),
        notificationPreference: joi.boolean()
      })
      .unknown(false),
  })
  .unknown(true)

export const findManyUserDto = joi
  .object({
    headers: joi
      .object({
        authorization: joi.string().required(),
      }).unknown(true),
    query: joi
      .object({
        limit: joi.number().min(1).integer(),
        offset: joi.number().min(0).integer(),
        sortBy: joi.string().valid(...Object.values(UserSortBy)),
        sortDirection: joi.string().valid(...Object.values(SortDirection)),
        firstName: joi.string(),
        lastName: joi.string(),
        email: joi.string(),
        status: joi.string().valid(...Object.values(UserStatuses)).default(UserStatuses.ACTIVE),
        userType: joi.string().valid(...Object.values(UserTypes)),
      })
      .unknown(false),
  })
  .unknown(true)

export const findOneUserDto = joi
  .object({
    headers: joi
      .object({
        authorization: joi.string().required(),
      }).unknown(true),
    params: joi
      .object({
        userId: joi.string().uuid().required(),
      })
      .unknown(false),
  })
  .unknown(true)

export const deactivateUserDto = joi
  .object({
    headers: joi
      .object({
        authorization: joi.string().required(),
      }).unknown(true),
    params: joi
      .object({
        userId: joi.string().uuid().required(),
      })
      .unknown(false),
  })
  .unknown(true)