import joi from 'joi'
import { SortDirection } from '@/common/constants'
import { PostSortBy } from './posts.type'

export const createPostDto = joi
  .object({
    headers: joi
      .object({
        authorization: joi.string().required(),
      }).unknown(true),
    body: joi
      .object({
        title: joi.string(),
        description: joi.string()
      })
      .unknown(false),
  })
  .unknown(true)

export const updatePostDto = joi
  .object({
    headers: joi
      .object({
        authorization: joi.string().required(),
      }).unknown(true),
    body: joi
      .object({
        title: joi.string(),
        description: joi.string()
      })
      .unknown(false),
  })
  .unknown(true)

export const findManyPostDto = joi
  .object({
    headers: joi
      .object({
        authorization: joi.string().required(),
      }).unknown(true),
    query: joi
      .object({
        limit: joi.number().min(1).integer(),
        offset: joi.number().min(0).integer(),
        sortBy: joi.string().valid(...Object.values(PostSortBy)),
        sortDirection: joi.string().valid(...Object.values(SortDirection))
      })
      .unknown(false),
  })
  .unknown(true)

export const findOnePostDto = joi
  .object({
    headers: joi
      .object({
        authorization: joi.string().required(),
      }).unknown(true),
    params: joi
      .object({
        postId: joi.string().uuid().required(),
      })
      .unknown(false),
  })
  .unknown(true)