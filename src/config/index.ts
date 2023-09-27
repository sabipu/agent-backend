import { config as prodConfig } from './config.production'
import { config as devConfig } from './config.development'
import { config as localConfig } from './config.local'

export const APP_ENVIRONMENT = process.env.NODE_ENV || 'local';

const configMap: Record<string, any> = {
  production: prodConfig,
  development: devConfig,
  local: localConfig,
};

export const config = configMap[APP_ENVIRONMENT];