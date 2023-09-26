import { NextFunction, Request, Response } from "express"
import { logger } from "./logger"

export const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const originalSendFunc = res.send.bind(res);
  res.send = function(body) {
    const endTime = Date.now();
    const duration = endTime - startTime;
    const logMessage = `Received ${req.method} request at ${req.url} - Status: ${res.statusCode} - Duration: ${duration}ms`;
    logger.info(logMessage);

    return originalSendFunc(body);
  };

  next()
}
