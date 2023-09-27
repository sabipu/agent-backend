export const config = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  EMAIL_SERVICE_INFO: {
    apiKey: process.env.SENDGRID_API_KEY as string
  }
}