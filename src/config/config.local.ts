export const config = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.MAIN_DATABASE_URL,
  EMAIL_SERVICE_INFO: {
    host: process.env.EMAIL_SERVICE_HOST,
    port: Number(process.env.EMAIL_SERVICE_PORT)
  },
  DATABASE_DIALECT_OPTIONS: {}
}