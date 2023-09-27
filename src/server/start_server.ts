import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { dataSource, syncModelToTable } from '@/database/database'
import routes from './routes'
import { errorHandler } from './errorHandler'
import { logger } from './logger'
import { requestLoggerMiddleware } from './requestLoggerMiddleware'
import { config } from '@/config'

const app = express();

async function bootstrap() {
  try {
    await dataSource.authenticate()
    logger.info('Database initialized')
    await syncModelToTable()
    logger.info('All models were synchronized successfully.')
    app.use(cors({}));
    app.use(helmet());
    app.use(express.json({ limit: '10kb' }));
    app.use(express.urlencoded({ extended: true }));

    app.use(requestLoggerMiddleware)
    app.use(routes)
    app.use(errorHandler)

    app.all('*', (req: Request, res: Response) => {
      return res.status(500).json({ message: `Route ${req.originalUrl} not found` })
    });

    app.set('PORT', config.PORT)
    app.listen(app.get('PORT'), async () => {
      logger.info(`Backend app listening on port ${app.get('PORT')}`)
    });
  } catch (error) {
    logger.error('Express initialization error', error)
  }
}

bootstrap();