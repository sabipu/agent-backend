import { Op } from '@sequelize/core'
import { SortDirection } from '@/common/constants'
import { Users, Users as usersRepository } from './users.model'
import { CreateUserData, FindManyUserQuery, FindManyUserResult, FindOneUserQuery, UpdateUserData, UserSortBy } from './users.type'

async function createUser(user: CreateUserData): Promise<Users> {
  return await usersRepository.create(user)
}

async function updateUser(userId: string, data: UpdateUserData) {
  const user = await usersRepository.findOne({
    where: {
      userId
    }
  })

  if (!user) {
    throw {
      code: 404,
      message: 'UserNotFound'
    }
  }
  user.set(data);
  return await user.save()
}

async function deleteUser(userId: string) {
  const user = await usersRepository.findOne({
    where: {
      userId
    }
  })

  if (!user) {
    throw {
      code: 404,
      message: 'UserNotFound'
    }
  }

  return await user.destroy()
}

async function findUser(query: FindOneUserQuery): Promise<Users | null> {
  return usersRepository.findOne({
    where: query
  })
}

async function findManyUser(query: FindManyUserQuery): Promise<FindManyUserResult> {
  try {
    const {
      limit = 0,
      sortBy = UserSortBy.CREATED_AT,
      offset = 0,
      sortDirection = SortDirection.DESC,
      email,
    } = query

    const { count, rows } = await usersRepository.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [
        [sortBy, sortDirection]
      ],
      where: {
        email: {
          [Op.like]: email,
        }
      },
    })

    return {
      totalCount: count,
      data: rows,
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

export default {
  createUser,
  updateUser,
  findUser,
  findManyUser,
  deleteUser
}