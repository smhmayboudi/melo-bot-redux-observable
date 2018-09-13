import {
  Collection,
  CollectionInsertOneOptions,
  Db,
  DbCollectionOptions,
  FilterQuery,
  FindOneOptions,
  InsertOneWriteOpResult,
  MongoClient,
  MongoClientOptions,
} from "mongodb";
import { Action } from "redux";
import * as FormData from "form-data";
import * as http from "http";
import { Observable } from "rxjs";

export interface IDependencies {
  botToken?: string;
  collectionObservable?: (db: Db, name: string, options: DbCollectionOptions) => Observable<Collection<any>>
  findOneObservable?: (collection: Collection, query: FilterQuery<any>, options?: FindOneOptions) => Observable<any>,
  insertOneObservable?: (collection: Collection, docs: any, options: CollectionInsertOneOptions) => Observable<InsertOneWriteOpResult>
  mongoClientObservable?: () => Observable<MongoClient>;
  requestObservable?: (options: http.RequestOptions, data?: any) => Observable<any>;
  requestUploadObservable?: (options: http.RequestOptions, formData: FormData) => Observable<any>;
  requestsObservable?: (options: http.RequestOptions, data?: any) => Observable<any>;
  requestsUploadObservable?: ((options: http.RequestOptions, formData: FormData) => Observable<any>);
  testAction$?: () => Observable<Action<string>>;
  youtubeDownloadObservable?: (videoId: string) => Observable<any>;
}