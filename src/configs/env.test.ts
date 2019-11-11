import * as env from "./env";

describe("env configs", (): void => {
  test("should handle BOT_TOKEN", (): void => {
    expect(env.BOT_TOKEN).toEqual(
      "520526310:AAHBhSmt26hE71hP6ZKzrV7LFrQUtSOPYRc"
    );
  });

  test("should handle CHANNEL", (): void => {
    expect(env.CHANNEL).toEqual("melodio");
  });

  test("should handle CHANNEL_JOIN_LINK", (): void => {
    expect(env.CHANNEL_JOIN_LINK).toEqual(
      "520526310:AAHBhSmt26hE71hP6ZKzrV7LFrQUtSOPYRc"
    );
  });

  test("should handle DB_NAME", (): void => {
    expect(env.DB_NAME).toEqual("melodio");
  });

  test("should handle GOOGLE_API_KEY", (): void => {
    expect(env.GOOGLE_API_KEY).toEqual(
      "AIzaSyDw1FO0PiK1CUxpxMaTIrDGaEJRco4FBXg"
    );
  });

  test("should handle GOOGLE_API_LIST_MAX_RESULTS", (): void => {
    expect(env.GOOGLE_API_LIST_MAX_RESULTS).toEqual(10);
  });

  test("should handle GOOGLE_API_SAFE_SEARCH", (): void => {
    expect(env.GOOGLE_API_SAFE_SEARCH).toEqual("strict");
  });

  test("should handle GOOGLE_API_SEARCH_LIST_TYPE", (): void => {
    expect(env.GOOGLE_API_SEARCH_LIST_TYPE).toEqual("video");
  });

  test("should handle GOOGLE_API_RELEVANCE_LANGUAGE", (): void => {
    expect(env.GOOGLE_API_RELEVANCE_LANGUAGE).toEqual("fa");
  });

  test("should handle GOOGLE_API_REGION_CODE", (): void => {
    expect(env.GOOGLE_API_REGION_CODE).toEqual("ir");
  });

  test("should handle HOSTNAME", (): void => {
    expect(env.HOSTNAME).toEqual("127.0.0.1");
  });

  test("should handle METRICS_COLLECTOR_PREFIX", (): void => {
    expect(env.METRICS_COLLECTOR_PREFIX).toEqual("melo_bot_redux_observable_");
  });

  test("should handle METRICS_COLLECTOR_TIMEOUT", (): void => {
    expect(env.METRICS_COLLECTOR_TIMEOUT).toEqual(5000);
  });

  test("should handle MONGO_CLIENT_APPNAME", (): void => {
    expect(env.MONGO_CLIENT_APPNAME).toEqual("melo_bot_redux_observable");
  });

  test("should handle MONGO_CLIENT_LOGGER_LEVEL", (): void => {
    expect(env.MONGO_CLIENT_LOGGER_LEVEL).toEqual("info");
  });

  test("should handle MONGO_CLIENT_URI", (): void => {
    expect(env.MONGO_CLIENT_URI).toEqual("mongodb://127.0.0.1:27017");
  });

  test("should handle NODE_ENV", (): void => {
    expect(env.NODE_ENV).toEqual("development");
  });

  test("should handle READINESS_START_TIMEOUT", (): void => {
    expect(env.READINESS_START_TIMEOUT).toEqual(2000);
  });

  test("should handle READINESS_STOP_TIMEOUT", (): void => {
    expect(env.READINESS_STOP_TIMEOUT).toEqual(2000);
  });

  test("should handle REMOTEDEV_HOSTNAME", (): void => {
    expect(env.REMOTEDEV_HOSTNAME).toEqual("127.0.0.1");
  });

  test("should handle REMOTEDEV_NAME", (): void => {
    expect(env.REMOTEDEV_NAME).toEqual("melo_bot_redux_observable");
  });

  test("should handle REMOTEDEV_PORT", (): void => {
    expect(env.REMOTEDEV_PORT).toEqual(8000);
  });

  test("should handle REMOTEDEV_REALTIME", (): void => {
    expect(env.REMOTEDEV_REALTIME).toEqual(false);
  });

  test("should handle PORT", (): void => {
    expect(env.PORT).toEqual(8081);
  });

  test("should handle SENTRY_DSN", (): void => {
    expect(env.SENTRY_DSN).toEqual(
      "https://a74e2edcd150475f82cef68e0b09c5cd@sentry.io/1784965"
    );
  });

  test("should handle SENTRY_RELEASE", (): void => {
    expect(env.SENTRY_RELEASE).toEqual("development");
  });

  test("should handle SENTRY_SERVERNAME", (): void => {
    expect(env.SENTRY_SERVERNAME).toEqual("OSX");
  });

  test("should handle TEST_NUMBER_UNDEFINED", (): void => {
    try {
      expect(env.getter("TEST_NUMBER_UNDEFINED", "number")).toEqual("");
    } catch (error) {
      expect(error.message).toBe("{ [TEST_NUMBER_UNDEFINED: string]: number }");
    }
  });

  test("should handle TEST_STRING_UNDEFINED", (): void => {
    try {
      expect(env.getter("TEST_STRING_UNDEFINED", "string")).toEqual("");
    } catch (error) {
      expect(error.message).toBe("{ [TEST_STRING_UNDEFINED: string]: string }");
    }
  });

  test("should handle TEST_TYPE_UNDEFINED", (): void => {
    expect(env.getter("TEST_TYPE_UNDEFINED", "")).toEqual("");
  });
});
