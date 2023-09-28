import swaggerUi from 'swagger-ui-express'
import { Express, Request, Response } from 'express'

import swaggerSpec from './spec'

export const initSwagger = (app: Express) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
