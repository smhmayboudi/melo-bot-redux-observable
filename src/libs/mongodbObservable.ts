import {
  Collection,
  CollectionCreateOptions,
  CollectionInsertOneOptions,
  Db,
  DbCollectionOptions,
  FilterQuery,
  InsertOneWriteOpResult,
  MongoCallback,
  MongoClient,
  MongoClientOptions
} from "mongodb";
import { bindNodeCallback, Observable } from "rxjs";

const connectObs: (
  uri: string,
  options: MongoClientOptions,
  callback: MongoCallback<MongoClient>
) => void = (
  uri: string,
  options: MongoClientOptions,
  callback: MongoCallback<MongoClient>
): void => {
  MongoClient.connect(uri, options, callback);
};
const connectObservable: (
  uri: string,
  options: MongoClientOptions
) => Observable<MongoClient> = (
  uri: string,
  options: MongoClientOptions
): Observable<MongoClient> => bindNodeCallback(connectObs)(uri, options);

const collectionObs: (
  db: Db,
  name: string,
  options: DbCollectionOptions,
  callback: MongoCallback<Collection<any>>
) => void = (
  db: Db,
  name: string,
  options: DbCollectionOptions,
  callback: MongoCallback<Collection<any>>
): void => {
  db.collection(name, options, callback);
};
const collectionObservable: (
  db: Db,
  name: string,
  options: DbCollectionOptions
) => Observable<Collection<any>> = (
  db: Db,
  name: string,
  options: DbCollectionOptions
): Observable<Collection<any>> =>
  bindNodeCallback(collectionObs)(db, name, options);

const createCollectionObs: (
  db: Db,
  name: string,
  options: CollectionCreateOptions,
  callback: MongoCallback<Collection<any>>
) => void = (
  db: Db,
  name: string,
  options: CollectionCreateOptions,
  callback: MongoCallback<Collection<any>>
): void => {
  db.createCollection(name, options, callback);
};
const createCollectionObservable: (
  db: Db,
  name: string,
  options: CollectionCreateOptions
) => Observable<Collection<{}>> = (
  db: Db,
  name: string,
  options: CollectionCreateOptions
): Observable<Collection<{}>> =>
  bindNodeCallback(createCollectionObs)(db, name, options);

const findOneCollectionObs: (
  collection: Collection,
  filter: FilterQuery<any>,
  callback: MongoCallback<any>
) => void = (
  collection: Collection,
  filter: FilterQuery<any>,
  callback: MongoCallback<any>
): void => {
  collection.findOne(filter, callback);
};
const findOneObservable: (
  collection: Collection,
  filter: FilterQuery<any>
) => Observable<any> = (
  collection: Collection,
  filter: FilterQuery<any>
): Observable<any> =>
  bindNodeCallback(findOneCollectionObs)(collection, filter);

const insertOneObs: (
  collection: Collection,
  docs: any,
  options: CollectionInsertOneOptions,
  callback: MongoCallback<InsertOneWriteOpResult<any>>
) => void = (
  collection: Collection,
  docs: any,
  options: CollectionInsertOneOptions,
  callback: MongoCallback<InsertOneWriteOpResult<any>>
): void => {
  collection.insertOne(docs, options, callback);
};
const insertOneObservable: (
  collection: Collection,
  docs: any,
  options: CollectionInsertOneOptions
) => Observable<InsertOneWriteOpResult<any>> = (
  collection: Collection,
  docs: any,
  options: CollectionInsertOneOptions
): Observable<InsertOneWriteOpResult<any>> =>
  bindNodeCallback(insertOneObs)(collection, docs, options);

export {
  connectObservable,
  collectionObservable,
  createCollectionObservable,
  findOneObservable,
  insertOneObservable
};
