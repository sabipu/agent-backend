import { Sequelize } from '@sequelize/core';
import { logger } from '@/server/logger'
import { entities } from './entities'
import { config } from '@/config';

export const dataSource = new Sequelize(`${config.DATABASE_URL}`, {
  logging: (msg: any) => logger.debug(msg),
  models: entities,
  dialectOptions: config.DATABASE_DIALECT_OPTIONS
})

export async function syncModelToTable() {
  // return await dataSource.sync({ force: true })
  return await dataSource.sync({ alter: true })
}