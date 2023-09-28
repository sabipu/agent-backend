import { Router } from 'express'
import { verifyAccessToken } from '../../middleware/auth/verifyAccessToken'
import { validateDto } from '../../middleware/validateDto'
import { RoleNames } from '@/common/constants'
import { createPost, getAllPosts, getMyPosts, findPost, updatePost, softDeletePost } from './posts.controller'
import { createPostDto, findManyPostDto, findOnePostDto, updatePostDto } from './posts.dto'

const router = Router()

router.get('/posts', validateDto(findManyPostDto), verifyAccessToken([]), getAllPosts)

router.post('/posts', validateDto(createPostDto), verifyAccessToken([]), createPost)

router.get('/posts/me', validateDto(findManyPostDto), verifyAccessToken([]), getMyPosts)

router.get('/posts/:postId', validateDto(findOnePostDto), verifyAccessToken([]), findPost)

router.patch('/posts/:postId', validateDto(updatePostDto), verifyAccessToken([]), updatePost)

router.delete('/posts/:postId', validateDto(findOnePostDto), verifyAccessToken([RoleNames.ADMIN]), softDeletePost)

export default router