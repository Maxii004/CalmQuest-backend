/**
 * @file logger
 * @summary Logger service for the entire application
 */
import winston from "winston";

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});
/**
 * Initialize the logger instance
 */
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.printf(
      ({ level, message, timestamp }) => `${timestamp} : ${level}: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
  ],
});
//
export default logger;
