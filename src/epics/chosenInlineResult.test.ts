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

import { IActionChosenInlineResult } from "../../types/iActionChosenInlineResult";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateChosenInlineResultQuery } from "../../types/iStateChosenInlineResultQuery";
import * as actions from "../actions";
import { collectionObservable } from "../libs/mongodbObservable";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";
import * as epic from "./chosenInlineResult";

describe("chosenInlineResult epic", (): void => {
  const error: Error = new Error("");
  const query: IStateChosenInlineResultQuery = {
    from: {
      first_name: "",
      id: 0,
      is_bot: false,
      language_code: "en"
    },
    query: "",
    result_id: ""
  };
  const result = true;

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
      mariaClient = await createConnection("");
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
      const action$: ColdObservable<IActionChosenInlineResult> = cold("-a", {
        a: actions.chosenInlineResult.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        collectionObservable,
        insertOneObservable: (): ColdObservable<any> =>
          cold("-a", { a: { insertedId: "" } }),
        mongoClientObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<IActionChosenInlineResult> = epic.chosenInlineResult(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.chosenInlineResult.error({ error })
      });
    });
  });

  test("should handle dependency collectionObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionChosenInlineResult> = cold("-a", {
        a: actions.chosenInlineResult.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        collectionObservable: (): ColdObservable<any> => cold("--#", {}, error),
        insertOneObservable: (): ColdObservable<any> =>
          cold("-a", { a: { insertedId: "" } }),
        mongoClientObservable: (): Observable<MongoClient> => of(mongoClient)
      };
      const output$: Observable<IActionChosenInlineResult> = epic.chosenInlineResult(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.chosenInlineResult.error({ error })
      });
    });
  });

  test("should handle dependency insertOneObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionChosenInlineResult> = cold("-a", {
        a: actions.chosenInlineResult.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        collectionObservable,
        insertOneObservable: (): ColdObservable<any> => cold("--#", {}, error),
        mongoClientObservable: (): Observable<MongoClient> => of(mongoClient)
      };
      const output$: Observable<IActionChosenInlineResult> = epic.chosenInlineResult(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.chosenInlineResult.error({ error })
      });
    });
  });

  test("should handle error actionChosenInlineResultQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionChosenInlineResult> = cold("-a", {
        a: actions.chosenInlineResult.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        collectionObservable,
        insertOneObservable: (): ColdObservable<any> =>
          cold("-a", { a: { insertedId: "" } }),
        mongoClientObservable: (): Observable<MongoClient> => of(mongoClient)
      };
      const output$: Observable<IActionChosenInlineResult> = epic.chosenInlineResult(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: actions.chosenInlineResult.error({
          error: new Error(
            locales.find("actionChosenInlineResultQueryUndefined")
          )
        })
      });
    });
  });

  test("should handle result", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionChosenInlineResult> = cold("-a", {
        a: actions.chosenInlineResult.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        collectionObservable,
        insertOneObservable: (): ColdObservable<any> =>
          cold("-a", { a: { insertedId: "" } }),
        mongoClientObservable: (): Observable<MongoClient> => of(mongoClient)
      };
      const output$: Observable<IActionChosenInlineResult> = epic.chosenInlineResult(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("--a", {
        a: actions.chosenInlineResult.result({
          result
        })
      });
    });
  });
});
