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

import { IActionYoutubeDownloadResultInsert } from "../../types/iActionYoutubeDownloadResultInsert";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";
import * as actions from "../actions";
import * as env from "../configs/env";
import { collectionObservable } from "../libs/mongodbObservable";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";
import * as epic from "./youtubeDownloadResultInsert";

describe("youtubeDownloadResultInsert epic", (): void => {
  const error: Error = new Error("");
  const query: IStateYoutubeDownloadResultInsertQuery | null = {
    duration: 0,
    file_id: "small",
    file_size: 0,
    height: 0,
    id: "small",
    mime_type: "video/mp4",
    thumb: {
      file_id: "small",
      file_size: 0,
      height: 0,
      width: 0
    },
    title: "",
    width: 0
  };
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
      const action$: ColdObservable<IActionYoutubeDownloadResultInsert> = cold(
        "-a",
        {
          a: actions.youtubeDownloadResultInsert.query({ query })
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
      const output$: Observable<IActionYoutubeDownloadResultInsert> = epic.youtubeDownloadResultInsert(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeDownloadResultInsert.error({ error })
      });
    });
  });

  test("should handle dependency collectionObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownloadResultInsert> = cold(
        "-a",
        {
          a: actions.youtubeDownloadResultInsert.query({ query })
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
      const output$: Observable<IActionYoutubeDownloadResultInsert> = epic.youtubeDownloadResultInsert(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeDownloadResultInsert.error({ error })
      });
    });
  });

  test("should handle dependency insertOneObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownloadResultInsert> = cold(
        "-a",
        {
          a: actions.youtubeDownloadResultInsert.query({ query })
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
      const output$: Observable<IActionYoutubeDownloadResultInsert> = epic.youtubeDownloadResultInsert(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeDownloadResultInsert.error({ error })
      });
    });
  });

  test("should handle error actionYoutubeDownloadResultInsertQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownloadResultInsert> = cold(
        "-a",
        {
          a: actions.youtubeDownloadResultInsert.query({ query: undefined })
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
      const output$: Observable<IActionYoutubeDownloadResultInsert> = epic.youtubeDownloadResultInsert(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: actions.youtubeDownloadResultInsert.error({
          error: new Error(
            locales.find("actionYoutubeDownloadResultInsertQueryUndefined")
          )
        })
      });
    });
  });

  test("should handle result", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownloadResultInsert> = cold(
        "-a",
        {
          a: actions.youtubeDownloadResultInsert.query({ query })
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
      const output$: Observable<IActionYoutubeDownloadResultInsert> = epic.youtubeDownloadResultInsert(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("--a", {
        a: actions.youtubeDownloadResultInsert.result({
          result
        })
      });
    });
  });
});
