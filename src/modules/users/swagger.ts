import { generateSwaggerSpec } from '@/utils/swagger/helpers'
import { UserStatuses, UserTypes } from './users.constants'
import { UserSortBy } from './users.type'

export default generateSwaggerSpec([
  {
    path: '/users/me',
    method: 'get',
    tag: 'Users',
    authorization: 'bearer'
  },
  {
    path: '/users/me/updateProfile',
    method: 'put',
    tag: 'Users',
    authorization: 'bearer',
    body: {
      firstName: {
        type: 'string',
        required: false,
      },
      lastName: {
        type: 'string',
        required: false,
      },
      avatar: {
        type: 'string',
        required: false,
      },
      address: {
        type: 'string',
        required: false,
      },
      notificationPreference: {
        type: 'boolean',
        required: false,
      },
    }
  },
  {
    path: '/users',
    method: 'get',
    tag: 'Users',
    authorization: 'bearer',
    queries: {
      limit: { type: 'number', required: false },
      offset: { type: 'number', required: false },
      sortBy: {
        type: 'string',
        required: false,
        description: `valid values: ${Object.values(UserSortBy).join(', ')}.`
      },
      sortDirection: {
        type: 'string',
        required: false,
        description: 'valid values: ASC, DESC.'
      },
      lastName: { type: 'string', required: false },
      firstName: { type: 'string', required: false },
      email: { type: 'string', required: false },
      status: {
        type: 'string',
        required: false,
        description: `valid values: ${Object.values(UserStatuses).join(', ')}. Default value is ACTIVE.`,
      },
      userType: {
        type: 'string',
        required: false,
        description: `valid values: ${Object.values(UserTypes).join(', ')}.`
      },
    }
  },
  {
    path: '/users/{userId}',
    method: 'get',
    authorization: 'bearer',
    tag: 'Users',
    params: {
      userId: { type: 'string' }
    }
  },
  {
    path: '/users/{userId}',
    method: 'delete',
    authorization: 'bearer',
    tag: 'Users',
    params: {
      userId: { type: 'string' }
    }
  },
  {
    path: '/users/{userId}/deactivate',
    method: 'put',
    authorization: 'bearer',
    tag: 'Users',
    params: {
      userId: { type: 'string' }
    }
  }
])