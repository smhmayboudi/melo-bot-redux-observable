declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_DB_NAME__: string;
      __MONGO_URI__: string;
    }
  }
}

import { Db, MongoClient } from "mongodb";
import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionChosenInlineResult } from "../../types/iActionChosenInlineResult";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateChosenInlineResultQuery } from "../../types/iStateChosenInlineResultQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import {
  collectionObservable,
  insertOneObservable
} from "../libs/mongodbObservable";

import * as epic from "./chosenInlineResult";

describe("chosenInlineResult epic", (): void => {
  const error: Error = new Error("");
  const query: IStateChosenInlineResultQuery = {
    from: {
      first_name: "",
      id: 0,
      is_bot: false
    },
    query: "",
    result_id: ""
  };
  const result = true;

  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler((actual: IState, expected: IState):
      | boolean
      | void => {
      expect(actual).toEqual(expected);
    });
  });

  let db: Db;
  let connection: MongoClient;

  beforeAll(
    async (): Promise<any> => {
      connection = await MongoClient.connect(global.__MONGO_URI__, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      db = connection.db(global.__MONGO_DB_NAME__);
    }
  );

  beforeEach(
    async (): Promise<any> => {
      await db.collection("cache").deleteOne({ id: "small" });
    }
  );

  afterAll(
    async (): Promise<any> => {
      await connection.close();
    }
  );

  test("should handle dependency mongoClientObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionChosenInlineResult> = cold("-a", {
        a: actions.chosenInlineResult.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        collectionObservable,
        insertOneObservable,
        mongoClientObservable: undefined
      };
      const output$: Observable<IActionChosenInlineResult> = epic.chosenInlineResult(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: actions.chosenInlineResult.error({
          error: new Error(texts.epicDependencyMongoClientObservableUndefined)
        })
      });
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
        collectionObservable,
        insertOneObservable,
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

  test("should handle dependency collectionObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionChosenInlineResult> = cold("-a", {
        a: actions.chosenInlineResult.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        collectionObservable: undefined,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<IActionChosenInlineResult> = epic.chosenInlineResult(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: actions.chosenInlineResult.error({
          error: new Error(texts.epicDependencyCollectionObservableUndefined)
        })
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
        collectionObservable: (): ColdObservable<any> => cold("--#", {}, error),
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
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

  test("should handle dependency insertOneObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionChosenInlineResult> = cold("-a", {
        a: actions.chosenInlineResult.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        collectionObservable,
        insertOneObservable: undefined,
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<IActionChosenInlineResult> = epic.chosenInlineResult(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: actions.chosenInlineResult.error({
          error: new Error(texts.epicDependencyInsertOneObservableUndefined)
        })
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
        collectionObservable,
        insertOneObservable: (): ColdObservable<any> => cold("--#", {}, error),
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
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
        a: actions.chosenInlineResult.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        collectionObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<IActionChosenInlineResult> = epic.chosenInlineResult(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: actions.chosenInlineResult.error({
          error: new Error(texts.actionChosenInlineResultQueryUndefined)
        })
      });
    });
  });

  test("should handle result", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      // Const { cold, expectObservable } = runHelpers;
      const { cold } = runHelpers;
      const action$: ColdObservable<IActionChosenInlineResult> = cold("-a", {
        a: actions.chosenInlineResult.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        collectionObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<IActionChosenInlineResult> = epic.chosenInlineResult(
        action$,
        state$,
        dependencies
      );
      // ExpectObservable(output$).toEqual("-a", {
      //   A: actions.chosenInlineResult.result({ result })
      // });
      output$.toPromise().then((actual: IActionChosenInlineResult): void => {
        cold("---a", {
          a: actions.chosenInlineResult.result({
            result
          })
        })
          .toPromise()
          .then(
            (expected: IActionChosenInlineResult): boolean =>
              actual === expected
          );
      });
    });
  });
});
