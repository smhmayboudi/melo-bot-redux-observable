import * as env from "./env";

describe("env configs", (): void => {
  test("should handle TEST_BOOLEAN_UNDEFINED", (): void => {
    try {
      expect(env.getter("TEST_BOOLEAN_UNDEFINED", "boolean")).toBe(true);
    } catch (error) {
      expect(error.message).toBe(
        "{ [TEST_BOOLEAN_UNDEFINED: string]: boolean }"
      );
    }
  });

  test("should handle TEST_NUMBER_UNDEFINED", (): void => {
    try {
      expect(env.getter("TEST_NUMBER_UNDEFINED", "number")).toBe(0);
    } catch (error) {
      expect(error.message).toBe("{ [TEST_NUMBER_UNDEFINED: string]: number }");
    }
  });

  test("should handle TEST_STRING_UNDEFINED", (): void => {
    try {
      expect(env.getter("TEST_STRING_UNDEFINED", "string")).toBe("");
    } catch (error) {
      expect(error.message).toBe("{ [TEST_STRING_UNDEFINED: string]: string }");
    }
  });

  test("should handle TEST_TYPE_UNDEFINED", (): void => {
    expect(env.getter("TEST_TYPE_UNDEFINED", "")).toBe("");
  });

  test("should handle BOT_NAME", (): void => {
    expect(env.BOT_NAME).toBe("melo_bit_bot");
  });

  test("should handle BOT_TOKEN", (): void => {
    expect(env.BOT_TOKEN).toBe("520526310:AAHBhSmt26hE71hP6ZKzrV7LFrQUtSOPYRc");
  });

  test("should handle CHANNEL", (): void => {
    expect(env.CHANNEL).toBe("melodio");
  });

  test("should handle CHANNEL_JOIN_LINK", (): void => {
    expect(env.CHANNEL_JOIN_LINK).toBe(
      "https://t.me/joinchat/AAAAAEPogeZYp43PUvrfyA"
    );
  });

  test("should handle DB_NAME", (): void => {
    expect(env.DB_NAME).toBe("melodio");
  });

  test("should handle GOOGLE_API_KEY", (): void => {
    expect(env.GOOGLE_API_KEY).toBe("AIzaSyDw1FO0PiK1CUxpxMaTIrDGaEJRco4FBXg");
  });

  test("should handle GOOGLE_API_LIST_MAX_RESULTS", (): void => {
    expect(env.GOOGLE_API_LIST_MAX_RESULTS).toBe(10);
  });

  test("should handle GOOGLE_API_SAFE_SEARCH", (): void => {
    expect(env.GOOGLE_API_SAFE_SEARCH).toBe("strict");
  });

  test("should handle GOOGLE_API_SEARCH_LIST_TYPE", (): void => {
    expect(env.GOOGLE_API_SEARCH_LIST_TYPE).toBe("video");
  });

  test("should handle GOOGLE_API_RELEVANCE_LANGUAGE", (): void => {
    expect(env.GOOGLE_API_RELEVANCE_LANGUAGE).toBe("fa");
  });

  test("should handle GOOGLE_API_REGION_CODE", (): void => {
    expect(env.GOOGLE_API_REGION_CODE).toBe("ir");
  });

  test("should handle HOSTNAME", (): void => {
    expect(env.HOSTNAME).toBe("127.0.0.1");
  });

  test("should handle MARIA_CLIENT_URI", (): void => {
    expect(env.MARIA_CLIENT_URI).toBe(
      "mariadb://root:testpassword@127.0.0.1:3306/mysql"
    );
  });

  test("should handle METRICS_COLLECTOR_PREFIX", (): void => {
    expect(env.METRICS_COLLECTOR_PREFIX).toBe("melo_bot_redux_observable_");
  });

  test("should handle METRICS_COLLECTOR_TIMEOUT", (): void => {
    expect(env.METRICS_COLLECTOR_TIMEOUT).toBe(5000);
  });

  test("should handle MONGO_CLIENT_APPNAME", (): void => {
    expect(env.MONGO_CLIENT_APPNAME).toBe("melo_bot_redux_observable");
  });

  test("should handle MONGO_CLIENT_LOGGER_LEVEL", (): void => {
    expect(env.MONGO_CLIENT_LOGGER_LEVEL).toBe("info");
  });

  test("should handle MONGO_CLIENT_URI", (): void => {
    expect(env.MONGO_CLIENT_URI).toBe("mongodb://127.0.0.1:27017");
  });

  test("should handle NODE_ENV", (): void => {
    expect(env.NODE_ENV).toBe("development");
  });

  test("should handle READINESS_START_TIMEOUT", (): void => {
    expect(env.READINESS_START_TIMEOUT).toBe(2000);
  });

  test("should handle READINESS_STOP_TIMEOUT", (): void => {
    expect(env.READINESS_STOP_TIMEOUT).toBe(2000);
  });

  test("should handle REMOTEDEV_HOSTNAME", (): void => {
    expect(env.REMOTEDEV_HOSTNAME).toBe("127.0.0.1");
  });

  test("should handle REMOTEDEV_NAME", (): void => {
    expect(env.REMOTEDEV_NAME).toBe("melo_bot_redux_observable");
  });

  test("should handle REMOTEDEV_PORT", (): void => {
    expect(env.REMOTEDEV_PORT).toBe(8000);
  });

  test("should handle REMOTEDEV_REALTIME", (): void => {
    expect(env.REMOTEDEV_REALTIME).toBe(false);
  });

  test("should handle PORT", (): void => {
    expect(env.PORT).toBe(8081);
  });

  test("should handle PORT_SECURE", (): void => {
    expect(env.PORT_SECURE).toBe(8443);
  });

  test("should handle SENTRY_DSN", (): void => {
    expect(env.SENTRY_DSN).toBe(
      "https://a74e2edcd150475f82cef68e0b09c5cd@sentry.io/1784965"
    );
  });

  test("should handle SENTRY_RELEASE", (): void => {
    expect(env.SENTRY_RELEASE).toBe("development");
  });

  test("should handle SENTRY_SERVERNAME", (): void => {
    expect(env.SENTRY_SERVERNAME).toBe("OSX");
  });

  test("should handle TELEGRAM_CAPTION_LENGTH", (): void => {
    expect(env.TELEGRAM_CAPTION_LENGTH).toBe(200);
  });

  test("should handle TELEGRAM_TEXT_LENGTH", (): void => {
    expect(env.TELEGRAM_TEXT_LENGTH).toBe(4096);
  });

  test("should handle WEBHOOK_ENABLE", (): void => {
    expect(env.WEBHOOK_ENABLE).toBe(false);
  });
});
