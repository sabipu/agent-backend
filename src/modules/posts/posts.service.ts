import { Op } from '@sequelize/core'
import { SortDirection } from '@/common/constants'
import { Posts, Posts as postsRepository } from './posts.model'
import { CreatePostData, FindManyPostQuery, FindManyPostResult, FindOnePostQuery, UpdatePostData, PostSortBy } from './posts.type'

async function createPost(data: CreatePostData): Promise<Posts> {
  return await postsRepository.create(data)
}

async function updatePost(userId: string, postId: string, data: UpdatePostData) {
  const post = await postsRepository.findOne({
    where: {
      postId
    }
  })

  if (!post) {
    throw {
      code: 404,
      message: 'PostNotFound'
    }
  }

  if (post.user !== userId) {
    throw {
      code: 404,
      message: 'NoAccessToPost'
    }
  }
  post.set(data);
  return await post.save()
}

async function deletePost(postId: string) {
  const post = await postsRepository.findOne({
    where: {
      postId
    }
  })

  if (!post) {
    throw {
      code: 404,
      message: 'PostNotFound'
    }
  }

  return await post.destroy()
}

async function findPost(query: FindOnePostQuery): Promise<Posts | null> {
  return postsRepository.findOne({
    where: query
  })
}

async function findManyPost(query: FindManyPostQuery): Promise<FindManyPostResult> {
  try {
    const {
      limit = 0,
      sortBy = PostSortBy.CREATED_AT,
      offset = 0,
      sortDirection = SortDirection.DESC,
      title,
    } = query

    const { count, rows } = await postsRepository.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [
        [sortBy, sortDirection]
      ],
      where: {
        title: {
          [Op.like]: title,
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
  createPost,
  updatePost,
  findPost,
  findManyPost,
  deletePost
}