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
import { Action } from "redux";
import { Observable } from "rxjs";
import { IStateYoutubeDownloadResultInsertQuery } from "./iStateYoutubeDownloadResultInsertQuery";

export interface IDependencies {
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
    docs: TSchema,
    options: CollectionInsertOneOptions
  ): Observable<InsertOneWriteOpResult<TSchema>>;
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
  testAction$?: Observable<Action<string>>;
  youtubeDownloadObservable(
    videoId: string
  ): Observable<IStateYoutubeDownloadResultInsertQuery>;
}
