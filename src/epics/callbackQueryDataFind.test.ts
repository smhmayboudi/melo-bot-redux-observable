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
import { Observable, of, Subject } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionCallbackQueryDataFind } from "../../types/iActionCallbackQueryDataFind";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateCallbackQueryDataFindQuery } from "../../types/iStateCallbackQueryDataFindQuery";
import { IStateCallbackQueryDataInsertQuery } from "../../types/iStateCallbackQueryDataInsertQuery";
import * as actions from "../actions";
import { collectionObservable } from "../libs/mongodbObservable";
import { init as initDependencies } from "../utils/dependencies";
import { initialState } from "../utils/store";
import { locale } from "../utils/string";
import * as epic from "./callbackQueryDataFind";

describe("callbackQueryDataFind epic", (): void => {
  const error: Error = new Error("");
  const query: IStateCallbackQueryDataFindQuery = {
    id: "000000000000000000000000",
    pageToken: ""
  };
  const result: IStateCallbackQueryDataInsertQuery | null = {
    nextPageToken: "",
    pageInfo: {
      resultsPerPage: 0,
      totalResults: 0
    },
    prevPageToken: ""
  };
  const state$Value: IState = {
    ...initialState,
    callbackQueryDataFind: {
      query
    },
    message: {
      query: {
        message: {
          chat: {
            id: 0,
            type: ""
          },
          date: 0,
          message_id: 0
        },
        update_id: 0
      }
    }
  };

  let connection: MongoClient;
  let locales: ILocale;

  afterAll(
    async (): Promise<void> => {
      await connection.close();
    }
  );

  beforeAll(
    async (): Promise<void> => {
      connection = await MongoClient.connect(global.__MONGO_URI__, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      locales = await locale("en");
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
      const action$: ColdObservable<IActionCallbackQueryDataFind> = cold("-a", {
        a: actions.callbackQueryDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        collectionObservable,
        findOneObservable: (): ColdObservable<any> => cold("-a", { a: result }),
        mongoClientObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<IActionCallbackQueryDataFind> = epic.callbackQueryDataFind(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.callbackQueryDataFind.error({ error })
      });
    });
  });

  test("should handle dependency collectionObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataFind> = cold("-a", {
        a: actions.callbackQueryDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        collectionObservable: (): ColdObservable<any> => cold("--#", {}, error),
        findOneObservable: (): ColdObservable<any> => cold("-a", { a: result }),
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<IActionCallbackQueryDataFind> = epic.callbackQueryDataFind(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.callbackQueryDataFind.error({ error })
      });
    });
  });

  test("should handle dependency findOneObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataFind> = cold("-a", {
        a: actions.callbackQueryDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        collectionObservable,
        findOneObservable: (): ColdObservable<any> => cold("--#", {}, error),
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<IActionCallbackQueryDataFind> = epic.callbackQueryDataFind(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.callbackQueryDataFind.error({ error })
      });
    });
  });

  test("should handle error actionCallbackQueryDataFindQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataFind> = cold("-a", {
        a: actions.callbackQueryDataFind.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        collectionObservable,
        findOneObservable: (): ColdObservable<any> => cold("-a", { a: result }),
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<IActionCallbackQueryDataFind> = epic.callbackQueryDataFind(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: actions.callbackQueryDataFind.error({
          error: new Error(
            locales.find("actionCallbackQueryDataFindQueryUndefined")
          )
        })
      });
    });
  });

  test("should handle result", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataFind> = cold("-a", {
        a: actions.callbackQueryDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        collectionObservable,
        findOneObservable: (): ColdObservable<any> => cold("-a", { a: result }),
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<IActionCallbackQueryDataFind> = epic.callbackQueryDataFind(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("--a", {
        a: actions.callbackQueryDataFind.result({
          result
        })
      });
    });
  });
});
