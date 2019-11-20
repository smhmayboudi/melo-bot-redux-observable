import {
  Collection,
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

const collectionObs: <TSchema>(
  db: Db,
  name: string,
  options: DbCollectionOptions,
  callback: MongoCallback<Collection<TSchema>>
) => void = <TSchema>(
  db: Db,
  name: string,
  options: DbCollectionOptions,
  callback: MongoCallback<Collection<TSchema>>
): void => {
  db.collection<TSchema>(name, options, callback);
};
const collectionObservable: <TSchema>(
  db: Db,
  name: string,
  options: DbCollectionOptions
) => Observable<Collection<TSchema>> = <TSchema>(
  db: Db,
  name: string,
  options: DbCollectionOptions
): Observable<Collection<TSchema>> =>
  bindNodeCallback(collectionObs)<TSchema>(db, name, options);

const findOneObs: <TSchema, T = TSchema>(
  collection: Collection<TSchema>,
  filter: FilterQuery<TSchema>,
  callback: MongoCallback<T | null>
) => void = <TSchema, T = TSchema>(
  collection: Collection<TSchema>,
  filter: FilterQuery<TSchema>,
  callback: MongoCallback<T | null>
): void => {
  collection.findOne<T>(filter, callback);
};
const findOneObservable: <TSchema, T = TSchema>(
  collection: Collection<TSchema>,
  filter: FilterQuery<TSchema>
) => Observable<T | null> = <TSchema, T = TSchema>(
  collection: Collection<TSchema>,
  filter: FilterQuery<TSchema>
): Observable<T | null> =>
  bindNodeCallback(findOneObs)<TSchema, T>(collection, filter);

const insertOneObs: <TSchema>(
  collection: Collection<TSchema>,
  docs: TSchema,
  options: CollectionInsertOneOptions,
  callback: MongoCallback<InsertOneWriteOpResult<any>>
) => void = <TSchema>(
  collection: Collection<TSchema>,
  docs: TSchema,
  options: CollectionInsertOneOptions,
  callback: MongoCallback<InsertOneWriteOpResult<any>>
): void => {
  collection.insertOne(docs, options, callback);
};
const insertOneObservable: <TSchema>(
  collection: Collection<TSchema>,
  docs: TSchema,
  options: CollectionInsertOneOptions
) => Observable<InsertOneWriteOpResult<TSchema>> = <TSchema>(
  collection: Collection<TSchema>,
  docs: TSchema,
  options: CollectionInsertOneOptions
): Observable<InsertOneWriteOpResult<TSchema>> =>
  bindNodeCallback(insertOneObs)<TSchema>(collection, docs, options);

export {
  connectObservable,
  collectionObservable,
  findOneObservable,
  insertOneObservable
};
