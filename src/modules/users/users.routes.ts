import { Router } from 'express'
import { verifyAccessToken } from '../../middleware/auth/verifyAccessToken'
import { validateDto } from '../../middleware/validateDto'
import { RoleNames } from '@/common/constants'
import { getMe, getAllUsers, findUser, updateProfile, softDeleteUser, deActivateUser } from './users.controller'
import { findManyUserDto, findOneUserDto, updateProfileDto } from './users.dto'

const router = Router()

router.get('/users/me', verifyAccessToken([]), getMe)

router.post('/users/me/updateProfile', validateDto(updateProfileDto), verifyAccessToken([]), updateProfile)

router.get('/users', validateDto(findManyUserDto), verifyAccessToken([]), getAllUsers)

router.get('/users/:userId', validateDto(findOneUserDto), verifyAccessToken([]), findUser)

router.delete('/users/:userId', validateDto(findOneUserDto), verifyAccessToken([RoleNames.ADMIN]), softDeleteUser)

router.put(
  '/users/:userId/deactivate',
  validateDto(findOneUserDto),
  verifyAccessToken([RoleNames.ADMIN, RoleNames.DEVELOPER]),
  deActivateUser
)

export default router