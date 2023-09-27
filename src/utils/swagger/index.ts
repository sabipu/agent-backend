import swaggerUi from 'swagger-ui-express'
import { Express, Request, Response } from 'express'

import swaggerSpec from './spec'

export const initSwagger = (app: Express) => {
  // const swaggerSpec = swaggerJsDoc({
  //   openapi: '3.0.0',
  //   definition: {
  //     info: {
  //       title: 'Alpha platform',
  //       version: '0.0',
  //     },
  //     schemes: ['http'],
  //   },
  //   apis: ['./src/routes.ts', './src/**/*.route.ts']
  // })

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.get('/docs.json', (request: Request, response: Response) => {
    response.setHeader('Content-Type', 'application/json')

    return response.send(swaggerSpec)
  })
  console.log('swagger initialized')
}
