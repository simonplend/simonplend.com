import pino from "pino";

export function createLogger({ loggerLevel }) {
  return pino({
    level: loggerLevel,
    transport: {
      target: "pino-pretty",
      options: {
        ignore: "time,pid,hostname",
      }
    }
  });
}