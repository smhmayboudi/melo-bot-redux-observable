declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_DB_NAME__: string;
      __MONGO_URI__: string;
    }
  }
}

import { Connection, createConnection } from "mariadb";
import { MongoClient } from "mongodb";
import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionCallbackQueryDataInsert } from "../../types/iActionCallbackQueryDataInsert";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateCallbackQueryDataInsertQuery } from "../../types/iStateCallbackQueryDataInsertQuery";
import * as actions from "../actions";
import * as env from "../configs/env";
import { collectionObservable } from "../libs/mongodbObservable";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";
import * as epic from "./callbackQueryDataInsert";

describe("callbackQueryDataInsert epic", (): void => {
  const error: Error = new Error("");
  const query: IStateCallbackQueryDataInsertQuery = {};
  const result = "";

  let locales: ILocale;
  let mariaClient: Connection;
  let mongoClient: MongoClient;

  afterAll(
    async (): Promise<void> => {
      await mongoClient.close();
    }
  );

  beforeAll(
    async (): Promise<void> => {
      locales = await locale("en");
      mariaClient = await createConnection(env.MARIA_CLIENT_URI);
      mongoClient = await MongoClient.connect(global.__MONGO_URI__, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    }
  );

  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler((actual: IState, expected: IState):
      | boolean
      | void => {
      expect(actual).toEqual(expected);
    });
  });

  test("should handle dependency mongoClientObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataInsert> = cold(
        "-a",
        {
          a: actions.callbackQueryDataInsert.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        collectionObservable,
        insertOneObservable: (): ColdObservable<any> =>
          cold("-a", { a: { insertedId: "" } }),
        mongoClientObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<IActionCallbackQueryDataInsert> = epic.callbackQueryDataInsert(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.callbackQueryDataInsert.error({ error })
      });
    });
  });

  test("should handle dependency collectionObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataInsert> = cold(
        "-a",
        {
          a: actions.callbackQueryDataInsert.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        collectionObservable: (): ColdObservable<any> => cold("--#", {}, error),
        insertOneObservable: (): ColdObservable<any> =>
          cold("-a", { a: { insertedId: "" } }),
        mongoClientObservable: (): Observable<MongoClient> => of(mongoClient)
      };
      const output$: Observable<IActionCallbackQueryDataInsert> = epic.callbackQueryDataInsert(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.callbackQueryDataInsert.error({ error })
      });
    });
  });

  test("should handle dependency insertOneObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataInsert> = cold(
        "-a",
        {
          a: actions.callbackQueryDataInsert.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        collectionObservable,
        insertOneObservable: (): ColdObservable<any> => cold("--#", {}, error),
        mongoClientObservable: (): Observable<MongoClient> => of(mongoClient)
      };
      const output$: Observable<IActionCallbackQueryDataInsert> = epic.callbackQueryDataInsert(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.callbackQueryDataInsert.error({ error })
      });
    });
  });

  test("should handle error actionCallbackQueryDataInsertQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataInsert> = cold(
        "-a",
        {
          a: actions.callbackQueryDataInsert.query({ query: undefined })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        collectionObservable,
        insertOneObservable: (): ColdObservable<any> =>
          cold("-a", { a: { insertedId: "" } }),
        mongoClientObservable: (): Observable<MongoClient> => of(mongoClient)
      };
      const output$: Observable<IActionCallbackQueryDataInsert> = epic.callbackQueryDataInsert(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: actions.callbackQueryDataInsert.error({
          error: new Error(
            locales.find("actionCallbackQueryDataInsertQueryUndefined")
          )
        })
      });
    });
  });

  test("should handle result", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataInsert> = cold(
        "-a",
        {
          a: actions.callbackQueryDataInsert.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        collectionObservable,
        insertOneObservable: (): ColdObservable<any> =>
          cold("-a", { a: { insertedId: "" } }),
        mongoClientObservable: (): Observable<MongoClient> => of(mongoClient)
      };
      const output$: Observable<IActionCallbackQueryDataInsert> = epic.callbackQueryDataInsert(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("--a", {
        a: actions.callbackQueryDataInsert.result({
          result
        })
      });
    });
  });
});
