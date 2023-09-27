import { JsonObject } from 'swagger-ui-express'
import authSpec from '@/modules/auth/swagger'

const swaggerSpec: JsonObject = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Agent Platform APIs',
    description: 'API reference',
  },
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/health': {
      get: {
        tags: ['Health check'],
        description: 'Responds if the app is up and running',
        responses: {
          200: {
            description: 'ok'
          }
        }
      }
    },
    ...authSpec
  },
}

export default swaggerSpec