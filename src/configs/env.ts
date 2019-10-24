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
const GOOGLE_API_LIST_MAX_RESULTS: number = parseInt(
  getter("GOOGLE_API_LIST_MAX_RESULTS", "number"),
  10
);
const GOOGLE_API_SEARCH_LIST_TYPE: string = getter(
  "GOOGLE_API_SEARCH_LIST_TYPE",
  "string"
);
const HOSTNAME: string = getter("HOSTNAME", "string");
const METRICS_COLLECTOR_PREFIX: string = getter(
  "METRICS_COLLECTOR_PREFIX",
  "string"
);
const METRICS_COLLECTOR_TIMEOUT: number = parseInt(
  getter("METRICS_COLLECTOR_TIMEOUT", "number"),
  10
);
const MONGO_CLIENT_APPNAME: string = getter("MONGO_CLIENT_APPNAME", "string");
const MONGO_CLIENT_LOGGER_LEVEL: string = getter(
  "MONGO_CLIENT_LOGGER_LEVEL",
  "string"
);
const MONGO_CLIENT_URI: string = getter("MONGO_CLIENT_URI", "string");
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
const SENTRY_RELEASE: string = getter("SENTRY_RELEASE", "string");
const SENTRY_SERVERNAME: string = getter("SENTRY_SERVERNAME", "string");
const SERVICE_LITERATE_HOSTNAME: string = getter(
  "SERVICE_LITERATE_HOSTNAME",
  "string"
);
const SERVICE_LITERATE_PORT: number = parseInt(
  getter("SERVICE_LITERATE_PORT", "number"),
  10
);

export {
  BOT_TOKEN,
  GOOGLE_API_KEY,
  GOOGLE_API_LIST_MAX_RESULTS,
  GOOGLE_API_SEARCH_LIST_TYPE,
  HOSTNAME,
  METRICS_COLLECTOR_PREFIX,
  METRICS_COLLECTOR_TIMEOUT,
  MONGO_CLIENT_APPNAME,
  MONGO_CLIENT_LOGGER_LEVEL,
  MONGO_CLIENT_URI,
  NODE_ENV,
  READINESS_START_TIMEOUT,
  READINESS_STOP_TIMEOUT,
  REMOTEDEV_HOSTNAME,
  REMOTEDEV_NAME,
  REMOTEDEV_PORT,
  REMOTEDEV_REALTIME,
  PORT,
  SENTRY_DSN,
  SENTRY_RELEASE,
  SENTRY_SERVERNAME,
  SERVICE_LITERATE_HOSTNAME,
  SERVICE_LITERATE_PORT
};
