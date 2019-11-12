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

import { IActionYoutubeDownloadResultFind } from "../../types/iActionYoutubeDownloadResultFind";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateYoutubeDownloadResultFindQuery } from "../../types/iStateYoutubeDownloadResultFindQuery";
import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import {
  collectionObservable,
  findOneObservable
} from "../libs/mongodbObservable";

import * as epic from "./youtubeDownloadResultFind";

describe("youtubeDownloadResultFind epic", (): void => {
  const error: Error = new Error("");
  const query: IStateYoutubeDownloadResultFindQuery = {
    id: ""
  };
  const result: IStateYoutubeDownloadResultInsertQuery = {
    duration: 0,
    file_id: "",
    height: 0,
    id: "",
    title: "",
    width: 0
  };

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
      const action$: ColdObservable<IActionYoutubeDownloadResultFind> = cold(
        "-a",
        {
          a: actions.youtubeDownloadResultFind.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        collectionObservable,
        findOneObservable,
        mongoClientObservable: undefined
      };
      const output$: Observable<IActionYoutubeDownloadResultFind> = epic.youtubeDownloadResultFind(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: actions.youtubeDownloadResultFind.error({
          error: new Error(texts.epicDependencyMongoClientObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency mongoClientObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownloadResultFind> = cold(
        "-a",
        {
          a: actions.youtubeDownloadResultFind.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        collectionObservable,
        findOneObservable,
        mongoClientObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<IActionYoutubeDownloadResultFind> = epic.youtubeDownloadResultFind(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeDownloadResultFind.error({ error })
      });
    });
  });

  test("should handle dependency collectionObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownloadResultFind> = cold(
        "-a",
        {
          a: actions.youtubeDownloadResultFind.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        collectionObservable: undefined,
        findOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<IActionYoutubeDownloadResultFind> = epic.youtubeDownloadResultFind(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: actions.youtubeDownloadResultFind.error({
          error: new Error(texts.epicDependencyCollectionObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency collectionObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownloadResultFind> = cold(
        "-a",
        {
          a: actions.youtubeDownloadResultFind.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        collectionObservable: (): ColdObservable<any> => cold("--#", {}, error),
        findOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<IActionYoutubeDownloadResultFind> = epic.youtubeDownloadResultFind(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeDownloadResultFind.error({ error })
      });
    });
  });

  test("should handle dependency findOneObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownloadResultFind> = cold(
        "-a",
        {
          a: actions.youtubeDownloadResultFind.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        collectionObservable,
        findOneObservable: undefined,
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<IActionYoutubeDownloadResultFind> = epic.youtubeDownloadResultFind(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: actions.youtubeDownloadResultFind.error({
          error: new Error(texts.epicDependencyFindOneObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency findOneObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownloadResultFind> = cold(
        "-a",
        {
          a: actions.youtubeDownloadResultFind.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        collectionObservable,
        findOneObservable: (): ColdObservable<any> => cold("--#", {}, error),
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<IActionYoutubeDownloadResultFind> = epic.youtubeDownloadResultFind(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeDownloadResultFind.error({ error })
      });
    });
  });

  test("should handle error actionYoutubeDownloadResultFindQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownloadResultFind> = cold(
        "-a",
        {
          a: actions.youtubeDownloadResultFind.query({})
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        collectionObservable,
        findOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<IActionYoutubeDownloadResultFind> = epic.youtubeDownloadResultFind(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: actions.youtubeDownloadResultFind.error({
          error: new Error(texts.actionYoutubeDownloadResultFindQueryUndefined)
        })
      });
    });
  });

  test("should handle result", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      // Const { cold, expectObservable } = runHelpers;
      const { cold } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownloadResultFind> = cold(
        "-a",
        {
          a: actions.youtubeDownloadResultFind.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        collectionObservable,
        findOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<IActionYoutubeDownloadResultFind> = epic.youtubeDownloadResultFind(
        action$,
        state$,
        dependencies
      );
      // ExpectObservable(output$).toEqual("-a", {
      //   A: actions.youtubeDownloadResultFind.result({ result })
      // });
      output$
        .toPromise()
        .then((actual: IActionYoutubeDownloadResultFind): void => {
          cold("---a", {
            a: actions.youtubeDownloadResultFind.result({
              result
            })
          })
            .toPromise()
            .then(
              (expected: IActionYoutubeDownloadResultFind): boolean =>
                actual === expected
            );
        });
    });
  });
});
