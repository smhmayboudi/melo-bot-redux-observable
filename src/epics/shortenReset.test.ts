import { UpsertResult } from "mariadb";
import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IActionShortenReset } from "../../types/iActionShortenReset";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateShortenResetQuery } from "../../types/iStateShortenResetQuery";
import * as actions from "../actions";
import * as epic from "../epics/shortenReset";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";

describe("shortenReset epic", (): void => {
  const error: Error = new Error("");
  const query: IStateShortenResetQuery = {
    id: 0
  };
  const result: UpsertResult = {
    affectedRows: 0,
    insertId: 0,
    warningStatus: 0
  };

  let locales: ILocale;

  beforeAll(
    async (): Promise<void> => {
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

  test("should handle dependency connectionObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionShortenReset> = cold("-a", {
        a: actions.shortenReset.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        connectionObservable: (): ColdObservable<any> => cold("--#", {}, error),
        queryObservable: (): ColdObservable<any> => cold("--a", { a: result })
      };
      const output$: Observable<
        IActionShortenReset | IActionSendMessage
      > = epic.shortenReset(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.shortenReset.error({ error })
      });
    });
  });

  test("should handle dependency queryObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionShortenReset> = cold("-a", {
        a: actions.shortenReset.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        connectionObservable: (): ColdObservable<any> => cold("--a"),
        queryObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionShortenReset | IActionSendMessage
      > = epic.shortenReset(action$, state$, dependencies);
      expectObservable(output$).toBe("-----a", {
        a: actions.shortenReset.error({ error })
      });
    });
  });

  test("should handle error actionShortenResetQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionShortenReset> = cold("-a", {
        a: actions.shortenReset.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        connectionObservable: (): ColdObservable<any> => cold("--a"),
        queryObservable: (): ColdObservable<any> => cold("--a", { a: result })
      };
      const output$: Observable<
        IActionShortenReset | IActionSendMessage
      > = epic.shortenReset(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.shortenReset.error({
          error: new Error(locales.find("actionShortenResetQueryUndefined"))
        })
      });
    });
  });

  test("should handle result", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionShortenReset> = cold("-a", {
        a: actions.shortenReset.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        connectionObservable: (): ColdObservable<any> => cold("--a"),
        queryObservable: (): ColdObservable<any> => cold("--a", { a: result })
      };
      const output$: Observable<
        IActionShortenReset | IActionSendMessage
      > = epic.shortenReset(action$, state$, dependencies);
      expectObservable(output$).toBe("-----a", {
        a: actions.shortenReset.result({
          result
        })
      });
    });
  });
});
