import * as env from "./configs/env";

declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_DB_NAME__: string;
      __MONGO_URI__: string;
    }
  }
}

global.__MONGO_DB_NAME__ = "";
global.__MONGO_URI__ = "";

if (env.WEBHOOK_ENABLE) {
  require("./configs/https");
} else {
  require("./configs/http");
}
