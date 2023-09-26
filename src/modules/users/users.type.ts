import { SortDirection } from '@/common/constants'
import { UserStatuses, UserTypes } from './users.constants'
import { Users } from './users.model'

export enum UserSortBy {
  USER_ID = 'userId',
  EMAIL = 'email',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  STATUS = 'status',
  USER_TYPE = 'userType',
  DELETED_AT = 'deletedAt',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export type CreateUserData = {
  email: string
  firstName?: string
  lastName?: string
  hashedPassword?: string
  avatar?: string
  userStatus?: UserStatuses
  userType?: UserTypes
}

export type UpdateUserData = {
  firstName?: string
  lastName?: string
  avatar?: string
  status?: UserStatuses
  address?: string
  notificationPreference?: boolean
  userStatus?: UserStatuses
}

export type FindOneUserQuery = {
  id?: string
  userId?: string
  email?: string
  status?: UserStatuses
  userType?: UserTypes
}

export type FindManyUserQuery = {
  userId?: string | string[];
  email?: string;
  firstName?: string;
  lastName?: string;
  status?: UserStatuses
  userType?: UserTypes
  sortDirection?: SortDirection;
  sortBy?: UserSortBy;
  limit?: number;
  offset?: number;
}

export type FindManyUserResult = {
  data: Users[];
  totalCount: number;
}
