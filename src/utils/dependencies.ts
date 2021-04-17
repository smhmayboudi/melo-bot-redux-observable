import { Connection } from "mariadb";
import { MongoClient } from "mongodb";
import { Observable, of } from "rxjs";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import * as env from "../configs/env";
import { queryObservable } from "../libs/mariadbObservable";
import {
  collectionObservable,
  findOneObservable,
  insertOneObservable,
  replaceOneObservable
} from "../libs/mongodbObservable";
import { requestObservable } from "../libs/requestObservable";
import { requestsObservable } from "../libs/requestsObservable";
import { requestsUploadObservable } from "../libs/requestsUploadObservable";
import { requestUploadObservable } from "../libs/requestUploadObservable";
import { youtubeDownloadObservable } from "../libs/youtubeDownloadObservable";
import { authorization } from "./authorization";

const init: (
  locales: ILocale,
  mariaClient: Connection,
  mongoClient: MongoClient
) => IDependencies = (
  locales: ILocale,
  mariaClient: Connection,
  mongoClient: MongoClient
): IDependencies => {
  const connectionObservable: () => Observable<
    Connection
  > = (): Observable<Connection> => of(mariaClient);

  const mongoClientObservable: () => Observable<
    MongoClient
  > = (): Observable<MongoClient> => of(mongoClient);

  return {
    authorization,
    botToken: env.BOT_TOKEN,
    collectionObservable,
    connectionObservable,
    findOneObservable,
    insertOneObservable,
    locales,
    mongoClientObservable,
    queryObservable,
    replaceOneObservable,
    requestObservable,
    requestUploadObservable,
    requestsObservable,
    requestsUploadObservable,
    testAction$: undefined,
    youtubeDownloadObservable
  };
};

export { init };
