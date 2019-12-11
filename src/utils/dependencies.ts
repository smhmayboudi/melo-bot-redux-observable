import debug from "debug";
import { Connection } from "mariadb";
import { MongoClient } from "mongodb";
import { Observable } from "rxjs";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import * as env from "../configs/env";
import {
  createConnectionObservable,
  queryObservable
} from "../libs/mariadbObservable";
import {
  collectionObservable,
  connectObservable,
  findOneObservable,
  insertOneObservable
} from "../libs/mongodbObservable";
import { requestObservable } from "../libs/requestObservable";
import { requestsObservable } from "../libs/requestsObservable";
import { requestsUploadObservable } from "../libs/requestsUploadObservable";
import { requestUploadObservable } from "../libs/requestUploadObservable";
import { youtubeDownloadObservable } from "../libs/youtubeDownloadObservable";

const init: (
  locales: ILocale
) => {
  initDependencies: IDependencies;
} = (
  locales: ILocale
): {
  initDependencies: IDependencies;
} => {
  const appDebug: debug.IDebugger = debug("app:utils:dependencies");

  const connectionObservable: () => Observable<
    Connection
  > = (): Observable<Connection> =>
    createConnectionObservable(env.MARIA_CLIENT_URI);

  const mongoClientObservable: () => Observable<
    MongoClient
  > = (): Observable<MongoClient> =>
    connectObservable(env.MONGO_CLIENT_URI, {
      appname: env.MONGO_CLIENT_APPNAME,
      logger: appDebug,
      loggerLevel: env.MONGO_CLIENT_LOGGER_LEVEL,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

  const initDependencies: IDependencies = {
    botToken: env.BOT_TOKEN,
    collectionObservable,
    connectionObservable,
    findOneObservable,
    insertOneObservable,
    locales,
    mongoClientObservable,
    queryObservable,
    requestObservable,
    requestUploadObservable,
    requestsObservable,
    requestsUploadObservable,
    testAction$: undefined,
    youtubeDownloadObservable
  };

  return { initDependencies };
};

export { init };
