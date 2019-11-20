declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      __MONGO_DB_NAME__: string;
      __MONGO_URI__: string;
    }
  }
}

global.__MONGO_DB_NAME__ = "";
global.__MONGO_URI__ = "";

import "./configs/http";
