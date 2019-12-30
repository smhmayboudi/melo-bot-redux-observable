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
import { Observable, of, Subject } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IActionShortenList } from "../../types/iActionShortenList";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateShortenListQuery } from "../../types/iStateShortenListQuery";
import { IStateShortenListResult } from "../../types/iStateShortenListResult";
import * as actions from "../actions";
import * as epic from "../epics/shortenList";
import { init as initDependencies } from "../utils/dependencies";
import { initialState } from "../utils/store";
import { locale } from "../utils/string";

describe("shortenList epic", (): void => {
  const error: Error = new Error("");
  const query: IStateShortenListQuery = {};
  const result: IStateShortenListResult[] = [
    {
      alphabet: "",
      count: 0,
      date: null,
      id: 0,
      longLink: "",
      longBase64: null,
      shortLink: ""
    }
  ];
  const resultQuery: any[] = [
    {
      alphabet: "",
      count: 0,
      date: null,
      id: 0,
      long_link: "",
      long_base64: null,
      short_link: ""
    }
  ];
  const state$Value: IState = {
    ...initialState,
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

  test("should handle dependency connectionObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionShortenList> = cold("-a", {
        a: actions.shortenList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        connectionObservable: (): ColdObservable<any> => cold("--#", {}, error),
        queryObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultQuery })
      };
      const output$: Observable<
        IActionSendMessage | IActionShortenList
      > = epic.shortenList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.shortenList.error({ error })
      });
    });
  });

  test("should handle dependency queryObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionShortenList> = cold("-a", {
        a: actions.shortenList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        connectionObservable: (): ColdObservable<any> => cold("--a"),
        queryObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionSendMessage | IActionShortenList
      > = epic.shortenList(action$, state$, dependencies);
      expectObservable(output$).toBe("-----a", {
        a: actions.shortenList.error({ error })
      });
    });
  });

  test("should handle error actionShortenListQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionShortenList> = cold("-a", {
        a: actions.shortenList.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        connectionObservable: (): ColdObservable<any> => cold("--a"),
        queryObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultQuery })
      };
      const output$: Observable<
        IActionSendMessage | IActionShortenList
      > = epic.shortenList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.shortenList.error({
          error: new Error(locales.find("actionShortenListQueryUndefined"))
        })
      });
    });
  });

  test("should handle error actionShortenListQueryShortLink empty", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionShortenList> = cold("-a", {
        a: actions.shortenList.query({ query: { shortLink: "" } })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        connectionObservable: (): ColdObservable<any> => cold("--a"),
        queryObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultQuery })
      };
      const output$: Observable<
        IActionSendMessage | IActionShortenList
      > = epic.shortenList(action$, state$, dependencies);
      expectObservable(output$).toBe("-----a", {
        a: actions.shortenList.result({ result })
      });
    });
  });

  test("should handle error actionShortenListQueryShortLink not empty", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionShortenList> = cold("-a", {
        a: actions.shortenList.query({ query: { shortLink: "test" } })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        connectionObservable: (): ColdObservable<any> => cold("--a"),
        queryObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultQuery })
      };
      const output$: Observable<
        IActionSendMessage | IActionShortenList
      > = epic.shortenList(action$, state$, dependencies);
      expectObservable(output$).toBe("-----a", {
        a: actions.shortenList.result({ result })
      });
    });
  });

  test("should handle result rows null", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionShortenList> = cold("-a", {
        a: actions.shortenList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        connectionObservable: (): ColdObservable<any> => cold("--a"),
        queryObservable: (): ColdObservable<any> => cold("--a", { a: null })
      };
      const output$: Observable<
        IActionSendMessage | IActionShortenList
      > = epic.shortenList(action$, state$, dependencies);
      expectObservable(output$).toBe("-----a", {
        a: actions.shortenList.result({ result: undefined })
      });
    });
  });

  test("should handle result", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionShortenList> = cold("-a", {
        a: actions.shortenList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        connectionObservable: (): ColdObservable<any> => cold("--a"),
        queryObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultQuery })
      };
      const output$: Observable<
        IActionSendMessage | IActionShortenList
      > = epic.shortenList(action$, state$, dependencies);
      expectObservable(output$).toBe("-----a", {
        a: actions.shortenList.result({ result })
      });
    });
  });
});
