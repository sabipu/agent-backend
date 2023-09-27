export const config = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  EMAIL_SERVICE_INFO: {
    host: process.env.MAILTRAP_HOSTNAME,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_AUTH_USERNAME,
      pass: process.env.MAILTRAP_AUTH_PASS
    }
  }
}