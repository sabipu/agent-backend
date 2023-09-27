import { Sequelize } from '@sequelize/core';
import { logger } from '@/server/logger'
import { entities } from './entities'

const MAIN_DB_URL = process.env.MAIN_DATABASE_URL

export const dataSource = new Sequelize(`${MAIN_DB_URL}`, {
  logging: (msg: any) => logger.debug(msg),
  models: entities,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

export async function syncModelToTable() {
  // return await dataSource.sync({ force: true })
  return await dataSource.sync({ alter: true })
}