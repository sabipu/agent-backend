import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { dataSource, syncModelToTable } from '@/database/database'
import routes from './routes'
import { errorHandler } from './errorHandler'
import { logger } from './logger'
import { requestLoggerMiddleware } from './requestLoggerMiddleware'

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

    // UNHANDLED ROUTES
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
      return res.status(500).json({ message: `Route ${req.originalUrl} not found` })
    });

    app.listen(process.env.PORT || 3000, async () => {
      logger.info(`Backend app listening on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    logger.error('Express initialization error', error)
  }
}

bootstrap();