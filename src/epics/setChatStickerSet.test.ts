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

import { IActionSetChatStickerSet } from "../../types/iActionSetChatStickerSet";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateSetChatStickerSetQuery } from "../../types/iStateSetChatStickerSetQuery";
import * as actions from "../actions";
import * as env from "../configs/env";
import * as epic from "../epics/setChatStickerSet";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";

describe("setChatStickerSet epic", (): void => {
  const error: Error = new Error("");
  const query: IStateSetChatStickerSetQuery = {
    chat_id: 0,
    sticker_set_name: ""
  };
  const result = true;
  const responseOKF: IResponse = {
    ok: false
  };
  const responseOKT: IResponse = {
    ok: true,
    result
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

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSetChatStickerSet> = cold("-a", {
        a: actions.setChatStickerSet.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionSetChatStickerSet | IActionSetChatStickerSet
      > = epic.setChatStickerSet(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.setChatStickerSet.error({ error })
      });
    });
  });

  test("should handle error actionSetChatStickerSetQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionSetChatStickerSet> = cold("-a", {
        a: actions.setChatStickerSet.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionSetChatStickerSet | IActionSetChatStickerSet
      > = epic.setChatStickerSet(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.setChatStickerSet.error({
          error: new Error(
            locales.find("actionSetChatStickerSetQueryUndefined")
          )
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSetChatStickerSet> = cold("-a", {
        a: actions.setChatStickerSet.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionSetChatStickerSet> = epic.setChatStickerSet(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.setChatStickerSet.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSetChatStickerSet> = cold("-a", {
        a: actions.setChatStickerSet.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionSetChatStickerSet> = epic.setChatStickerSet(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.setChatStickerSet.result({ result })
      });
    });
  });
});
