declare global {
  namespace NodeJS {
    // tslint:disable-next-line: interface-name
    interface Global {
      __MONGO_DB_NAME__: string;
      __MONGO_URI__: string;
    }
  }
}

global.__MONGO_DB_NAME__ = "";
global.__MONGO_URI__ = "";

/* tslint:disable:no-import-side-effect */
import "./config/http";
