import os from 'os'
import winston from "winston"
import syslog from "winston-syslog"

const ENV_NAME: string = process.env.ENV_NAME ?? "local"

const papertrailTransport = new syslog.Syslog({
  host: "logs.papertrailapp.com",
  port: process.env.PAPERTRIAL_LOGS_PORT as unknown as number,
  protocol: "tls4",
  localhost: os.hostname(),
  eol: '\n'
})

export const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `📰 ${timestamp} [${level.toUpperCase()}] [${ENV_NAME.toUpperCase()}] ${message}`
    })
  ),
  transports: ENV_NAME === "local" ? [new winston.transports.Console()] : [papertrailTransport],
})
