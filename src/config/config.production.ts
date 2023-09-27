export const config = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.MAIN_DATABASE_URL,
  EMAIL_SERVICE_INFO: {
    apiKey: process.env.SENDGRID_API_KEY as string
  },
  DATABASE_DIALECT_OPTIONS: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}