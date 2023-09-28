import { SortDirection } from '@/common/constants'
import { Posts } from './posts.model'

export enum PostSortBy {
  TITLE = 'title',
  DELETED_AT = 'deletedAt',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export type CreatePostData = {
  title: string
  description: string
  user: string
}

export type UpdatePostData = {
  title?: string
  description?: string
}

export type FindOnePostQuery = {
  postId?: string
}

export type FindManyPostQuery = {
  title?: string;
  sortDirection?: SortDirection;
  sortBy?: PostSortBy;
  limit?: number;
  offset?: number;
}

export type FindManyPostResult = {
  data: Posts[];
  totalCount: number;
}
