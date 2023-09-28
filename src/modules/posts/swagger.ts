import { generateSwaggerSpec } from '@/utils/swagger/helpers'
import { PostSortBy } from './posts.type'

export default generateSwaggerSpec([
  {
    path: '/posts',
    method: 'post',
    tag: 'Posts',
    body: {
      title: {
        type: 'string',
        required: true,
      },
      description: {
        type: 'string',
        required: false,
      }
    }
  },
  {
    path: '/posts/{postId}',
    method: 'patch',
    authorization: 'bearer',
    tag: 'Posts',
    body: {
      title: {
        type: 'string',
        required: false,
      },
      description: {
        type: 'string',
        required: false,
      }
    },
    params: {
      postId: { type: 'string' }
    }
  },
  {
    path: '/posts',
    method: 'get',
    tag: 'Posts',
    queries: {
      limit: { type: 'number', required: false },
      offset: { type: 'number', required: false },
      sortBy: {
        type: 'string',
        required: false,
        description: `valid values: ${Object.values(PostSortBy).join(', ')}.`
      },
      sortDirection: {
        type: 'string',
        required: false,
        description: 'valid values: ASC, DESC.'
      }
    }
  },
  {
    path: '/posts/me',
    method: 'get',
    tag: 'Posts',
    authorization: 'bearer',
    queries: {
      limit: { type: 'number', required: false },
      offset: { type: 'number', required: false },
      sortBy: {
        type: 'string',
        required: false,
        description: `valid values: ${Object.values(PostSortBy).join(', ')}.`
      },
      sortDirection: {
        type: 'string',
        required: false,
        description: 'valid values: ASC, DESC.'
      }
    }
  },
  {
    path: '/posts/{postId}',
    method: 'get',
    authorization: 'bearer',
    tag: 'Posts',
    params: {
      postId: { type: 'string' }
    }
  },
  {
    path: '/posts/{postId}',
    method: 'delete',
    authorization: 'bearer',
    tag: 'Posts',
    params: {
      postId: { type: 'string' }
    }
  }
])