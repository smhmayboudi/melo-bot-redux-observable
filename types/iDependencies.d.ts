import FormData from "form-data";
import * as http from "http";
import { Connection, QueryOptions } from "mariadb";
import {
  Collection,
  CollectionInsertOneOptions,
  Db,
  DbCollectionOptions,
  FilterQuery,
  InsertOneWriteOpResult,
  MongoClient
} from "mongodb";
import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";

import { IAction } from "./iAction";
import { ILocale } from "./iLocale";
import { IState } from "./iState";
import { IStateYoutubeDownloadResultInsertQuery } from "./iStateYoutubeDownloadResultInsertQuery";

export interface IDependencies {
  authorization(
    value: IAction,
    state$: StateObservable<IState> | undefined,
    index: number
  ): Observable<boolean>;
  botToken: string;
  collectionObservable<TSchema>(
    db: Db,
    name: string,
    options: DbCollectionOptions
  ): Observable<Collection<TSchema>>;
  connectionObservable(): Observable<Connection>;
  findOneObservable<TSchema, T = TSchema>(
    collection: Collection<TSchema>,
    filter: FilterQuery<TSchema>
  ): Observable<T | null>;
  insertOneObservable<TSchema>(
    collection: Collection<TSchema>,
    docs: TSchema & any,
    options: CollectionInsertOneOptions
  ): Observable<InsertOneWriteOpResult<TSchema & any>>;
  locales: ILocale;
  mongoClientObservable(): Observable<MongoClient>;
  queryObservable(
    connection: Connection,
    sql: string | QueryOptions,
    values?: any
  ): Observable<any>;
  requestObservable<T>(options: http.RequestOptions, data?: any): Observable<T>;
  requestUploadObservable<T>(
    options: http.RequestOptions,
    formData: FormData
  ): Observable<T>;
  requestsObservable<T>(
    options: http.RequestOptions,
    data?: any
  ): Observable<T>;
  requestsUploadObservable<T>(
    options: http.RequestOptions,
    formData: FormData
  ): Observable<T>;
  testAction$?: Observable<IAction>;
  youtubeDownloadObservable(
    videoId: string
  ): Observable<IStateYoutubeDownloadResultInsertQuery>;
}
