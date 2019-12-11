declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_DB_NAME__: string;
      __MONGO_URI__: string;
    }
  }
}

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
import {
  collectionObservable,
  insertOneObservable
} from "../libs/mongodbObservable";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";
import * as epic from "./callbackQueryDataInsert";

describe("callbackQueryDataInsert epic", (): void => {
  const locales: ILocale = locale("en");
  const error: Error = new Error("");
  const query: IStateCallbackQueryDataInsertQuery = {};
  const result = "";

  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler((actual: IState, expected: IState):
      | boolean
      | void => {
      expect(actual).toEqual(expected);
    });
  });

  let connection: MongoClient;

  beforeAll(
    async (): Promise<any> => {
      connection = await MongoClient.connect(global.__MONGO_URI__, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    }
  );

  afterAll(
    async (): Promise<any> => {
      await connection.close();
    }
  );

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
        ...initDependencies(locales).initDependencies,
        collectionObservable,
        insertOneObservable,
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
        ...initDependencies(locales).initDependencies,
        collectionObservable: (): ColdObservable<any> => cold("--#", {}, error),
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
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
        ...initDependencies(locales).initDependencies,
        collectionObservable,
        insertOneObservable: (): ColdObservable<any> => cold("--#", {}, error),
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
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
        ...initDependencies(locales).initDependencies,
        collectionObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
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
      const { cold } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataInsert> = cold(
        "-a",
        {
          a: actions.callbackQueryDataInsert.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        collectionObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<IActionCallbackQueryDataInsert> = epic.callbackQueryDataInsert(
        action$,
        state$,
        dependencies
      );
      output$.subscribe((actual: IActionCallbackQueryDataInsert) => {
        cold("---a", {
          a: actions.callbackQueryDataInsert.result({
            result
          })
        }).subscribe((expected: IActionCallbackQueryDataInsert) => {
          return actual === expected;
        });
      });
    });
  });
});
