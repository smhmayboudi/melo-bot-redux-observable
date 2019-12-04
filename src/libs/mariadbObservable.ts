import {
  Connection,
  ConnectionConfig,
  createConnection,
  QueryOptions
} from "mariadb";
import { Observable } from "rxjs";
import { fromPromise } from "rxjs/internal/observable/fromPromise";

const createConnectionObs: (
  connectionUri: string | ConnectionConfig
) => Promise<Connection> = (
  connectionUri: string | ConnectionConfig
): Promise<Connection> => createConnection(connectionUri);
const createConnectionObservable: (
  connectionUri: string | ConnectionConfig
) => Observable<Connection> = (
  connectionUri: string | ConnectionConfig
): Observable<Connection> => fromPromise(createConnectionObs(connectionUri));

const queryObs: (
  connection: Connection,
  sql: string | QueryOptions,
  values?: any
) => Promise<any> = (
  connection: Connection,
  sql: string | QueryOptions,
  values?: any
): Promise<any> => connection.query(sql, values);
const queryObservable: (
  connection: Connection,
  sql: string | QueryOptions,
  values?: any
) => Observable<any> = (
  connection: Connection,
  sql: string | QueryOptions,
  values?: any
): Observable<any> => fromPromise(queryObs(connection, sql, values));

export { createConnectionObservable, queryObservable };
