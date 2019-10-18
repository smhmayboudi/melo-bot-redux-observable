const getter: (key: string, type: string) => string = (
  key: string,
  type: string
): string => {
  const value: string | undefined = process.env[key];
  if (["number"].indexOf(type) > -1) {
    if (value === undefined || isNaN(parseInt(value, 10))) {
      throw new Error(`{ [${key}: string]: ${type} }`);
    }

    return value;
  }
  if (["string"].indexOf(type) > -1) {
    if (value === undefined) {
      throw new Error(`{ [${key}: string]: ${type} }`);
    }

    return value;
  }

  return "";
};

const BOT_TOKEN: string = getter("BOT_TOKEN", "string");
const GOOGLE_API_KEY: string = getter("GOOGLE_API_KEY", "string");
const HOSTNAME: string = getter("HOSTNAME", "string");
const METRICS_COLLECTOR_PREFIX: string = getter(
  "METRICS_COLLECTOR_PREFIX",
  "string"
);
const METRICS_COLLECTOR_TIMEOUT: number = parseInt(
  getter("METRICS_COLLECTOR_TIMEOUT", "number"),
  10
);
const NODE_ENV: string = getter("NODE_ENV", "string");
const READINESS_START_TIMEOUT: number = parseInt(
  getter("READINESS_START_TIMEOUT", "number"),
  10
);
const READINESS_STOP_TIMEOUT: number = parseInt(
  getter("READINESS_STOP_TIMEOUT", "number"),
  10
);
const REMOTEDEV_HOSTNAME: string = getter("REMOTEDEV_HOSTNAME", "string");
const REMOTEDEV_NAME: string = getter("REMOTEDEV_NAME", "string");
const REMOTEDEV_REALTIME: boolean =
  getter("REMOTEDEV_REALTIME", "string") === "true";
const REMOTEDEV_PORT: number = parseInt(getter("REMOTEDEV_PORT", "number"), 10);
const PORT: number = parseInt(getter("PORT", "number"), 10);
const SENTRY_DSN: string = getter("SENTRY_DSN", "string");
const SENTRY_SERVERNAME: string = getter("SENTRY_SERVERNAME", "string");

export {
  BOT_TOKEN,
  GOOGLE_API_KEY,
  HOSTNAME,
  METRICS_COLLECTOR_PREFIX,
  METRICS_COLLECTOR_TIMEOUT,
  NODE_ENV,
  READINESS_START_TIMEOUT,
  READINESS_STOP_TIMEOUT,
  REMOTEDEV_HOSTNAME,
  REMOTEDEV_NAME,
  REMOTEDEV_PORT,
  REMOTEDEV_REALTIME,
  PORT,
  SENTRY_DSN,
  SENTRY_SERVERNAME
};
