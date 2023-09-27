import { APIDefinition, generateSwaggerSpec } from '../../utils/swagger/helpers'
import { appConfig } from '@/appConfig'

const platformAuthSpecs: APIDefinition[] = [
  {
    path: 'auth/signup',
    method: 'post',
    tag: 'Authentication',
    body: {
      email: {
        required: true,
        type: 'string'
      },
      password: {
        required: true,
        type: 'string'
      },
      firstName: {
        required: false,
        type: 'string'
      },
      lastName: {
        required: false,
        type: 'string'
      }
    }
  },
  {
    path: 'auth/login',
    method: 'post',
    tag: 'Authentication',
    body: {
      email: {
        required: true,
        type: 'string'
      },
      password: {
        required: true,
        type: 'string'
      }
    }
  },
  {
    path: 'auth/forgot',
    method: 'post',
    tag: 'Authentication',
    body: {
      email: {
        required: true,
        type: 'string'
      }
    }
  },
]

const googleAuthSpecs: APIDefinition[] = [
  {
    path: 'auth/okta/signup',
    method: 'post',
    tag: 'Authentication',
    body: {
      idToken: {
        required: true,
        type: 'string'
      },
      teamIds: {
        type: 'array',
        required: false,
        items: { type: 'string', required: true },
      },
    }
  },
  {
    path: 'auth/okta/login',
    method: 'post',
    tag: 'Authentication',
    body: {
      idToken: {
        required: true,
        type: 'string'
      }
    }
  }
]

const authSpecs: APIDefinition[] = []

authSpecs.push(...platformAuthSpecs)

if (appConfig.authProviders?.includes('google')) {
  authSpecs.push(...googleAuthSpecs)
}

export default generateSwaggerSpec(authSpecs)
