import FormData from "form-data";
import * as http from "http";
import {
  Collection,
  CollectionInsertOneOptions,
  Db,
  DbCollectionOptions,
  FilterQuery,
  FindOneOptions,
  InsertOneWriteOpResult,
  MongoClient
} from "mongodb";
import { Observable } from "rxjs";

import { IAction } from "./iAction";
import { IStateYoutubeDownloadResultInsertQuery } from "./iStateYoutubeDownloadResultInsertQuery";

export interface IDependencies {
  botToken: string;
  collectionObservable(
    db: Db,
    name: string,
    options: DbCollectionOptions
  ): Observable<Collection<any>>;
  findOneObservable(
    collection: Collection,
    query: FilterQuery<any>,
    options?: FindOneOptions
  ): Observable<any>;
  insertOneObservable(
    collection: Collection,
    docs: any,
    options: CollectionInsertOneOptions
  ): Observable<InsertOneWriteOpResult<any>>;
  mongoClientObservable(): Observable<MongoClient>;
  requestObservable<T>(options: http.RequestOptions, data?: any): Observable<T>;
  requestsObservable<T>(
    options: http.RequestOptions,
    data?: any
  ): Observable<T>;
  requestsUploadObservable<T>(
    options: http.RequestOptions,
    formData: FormData
  ): Observable<T>;
  requestUploadObservable<T>(
    options: http.RequestOptions,
    formData: FormData
  ): Observable<T>;
  youtubeDownloadObservable(
    videoId: string
  ): Observable<IStateYoutubeDownloadResultInsertQuery>;
  testAction$?: Observable<IAction>;
}
