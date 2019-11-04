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
import { Action } from "redux";
import { Observable } from "rxjs";

import { IAction } from "./iAction";

export interface IDependencies {
  botToken?: string;
  collectionObservable?(
    db: Db,
    name: string,
    options: DbCollectionOptions
  ): Observable<Collection<any>>;
  findOneObservable?(
    collection: Collection,
    query: FilterQuery<any>,
    options?: FindOneOptions
  ): Observable<any>;
  insertOneObservable?(
    collection: Collection,
    docs: any,
    options: CollectionInsertOneOptions
  ): Observable<InsertOneWriteOpResult<any>>;
  mongoClientObservable?(): Observable<MongoClient>;
  requestObservable?(options: http.RequestOptions, data?: any): Observable<any>;
  requestsObservable?(
    options: http.RequestOptions,
    data?: any
  ): Observable<any>;
  requestsUploadObservable?: (
    options: http.RequestOptions,
    formData: FormData
  ) => Observable<any>;
  requestUploadObservable?(
    options: http.RequestOptions,
    formData: FormData
  ): Observable<any>;
  testAction$?: Observable<IAction>;
  youtubeDownloadObservable?(videoId: string): Observable<any>;
}
