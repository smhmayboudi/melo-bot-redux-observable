import debug from "debug";
import { MongoClient } from "mongodb";
import { Observable } from "rxjs";

import { IDependencies } from "../../types/iDependencies";
import {
  collectionObservable,
  connectObservable,
  findOneObservable,
  insertOneObservable
} from "../libs/mongodbObservable";
import { requestObservable } from "../libs/requestObservable";
import { requestUploadObservable } from "../libs/requestUploadObservable";
import { requestsObservable } from "../libs/requestsObservable";
import { requestsUploadObservable } from "../libs/requestsUploadObservable";
import { youtubeDownloadObservable } from "../libs/youtubeDownloadObservable";

import * as env from "../configs/env";

const appDebug: debug.IDebugger = debug("app:utils:dependencies");

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

const initialDependencies: IDependencies = {
  botToken: env.BOT_TOKEN,
  collectionObservable,
  findOneObservable,
  insertOneObservable,
  mongoClientObservable,
  requestObservable,
  requestUploadObservable,
  requestsObservable,
  requestsUploadObservable,
  testAction$: undefined,
  youtubeDownloadObservable
};

export { initialDependencies };
