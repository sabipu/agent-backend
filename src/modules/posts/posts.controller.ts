import { NextFunction, Request, Response } from 'express'
import { AuthenticationRequest } from '@/common/types'
import postsService from './posts.service'

export async function createPost(request: Request, response: Response, next: NextFunction) {
  try {
    const user = (request as AuthenticationRequest).user as any
    const post = await postsService.createPost({ ...request.body, user: user.id })

    return response.json(post)
  } catch (error) {
    next(error)
  }

}

export async function getAllPosts(request: Request, response: Response, next: NextFunction) {
  try {
    const posts = await postsService.findManyPost(request.query)

    return response.json(posts)
  } catch (error) {
    next(error)
  }
}

export async function getMyPosts(request: Request, response: Response, next: NextFunction) {
  try {
    const user = (request as AuthenticationRequest).user as any
    // const query = { owner: user.id }
    const posts = postsService.findManyPost(request.query)
    return response.json(posts)
  } catch (error) {
    next(error)
  }
}

export async function findPost(request: Request, response: Response, next: NextFunction) {
  try {
    const post = await postsService.findPost(request.params)

    return response.json(post)
  } catch (error) {
    next(error)
  }
}

export async function updatePost(request: Request, response: Response, next: NextFunction) {
  try {
    const user = (request as AuthenticationRequest).user as any
    const { postId } = request.params

    await postsService.updatePost(user.id, postId, request.body);

    return response.json(true)
  } catch (error) {
    next(error)
  }
}

export async function softDeletePost(request: Request, response: Response, next: NextFunction) {
  try {
    const { postId } = request.params

    await postsService.deletePost(postId)

    return response.json(true)
  } catch (error) {
    next(error)
  }
}