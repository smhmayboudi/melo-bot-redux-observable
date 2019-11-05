import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionCallbackQueryDataInsert } from "../../types/iActionCallbackQueryDataInsert";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateCallbackQueryDataInsertQuery } from "../../types/iStateCallbackQueryDataInsertQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "./callbackQueryDataInsert";

describe("callbackQueryDataInsert epic", (): void => {
  const error: Error = new Error("");
  const query: IStateCallbackQueryDataInsertQuery = {};
  const result = "";
  const responseOKF: IResponse = {
    ok: false
  };
  const responseOKT: IResponse = {
    ok: true,
    result
  };

  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler((actual: IState, expected: IState):
      | boolean
      | void => {
      expect(actual).toEqual(expected);
    });
  });

  test("should handle dependency botToken undefined", (): void => {
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
        botToken: undefined,
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionCallbackQueryDataInsert | IActionCallbackQueryDataInsert
      > = epic.callbackQueryDataInsert(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.callbackQueryDataInsert.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable undefined", (): void => {
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
        botToken: "",
        requestsObservable: undefined
      };
      const output$: Observable<
        IActionCallbackQueryDataInsert | IActionCallbackQueryDataInsert
      > = epic.callbackQueryDataInsert(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.callbackQueryDataInsert.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable error", (): void => {
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
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionCallbackQueryDataInsert | IActionCallbackQueryDataInsert
      > = epic.callbackQueryDataInsert(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.callbackQueryDataInsert.error({ error })
      });
    });
  });

  test("should handle error actionCallbackQueryDataInsertQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionCallbackQueryDataInsert> = cold("-a", {
        a: actions.callbackQueryDataInsert.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionCallbackQueryDataInsert | IActionCallbackQueryDataInsert
      > = epic.callbackQueryDataInsert(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.callbackQueryDataInsert.error({
          error: new Error(texts.actionCallbackQueryDataInsertQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
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
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<
        IActionCallbackQueryDataInsert
      > = epic.callbackQueryDataInsert(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.callbackQueryDataInsert.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
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
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<
        IActionCallbackQueryDataInsert
      > = epic.callbackQueryDataInsert(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.callbackQueryDataInsert.result({ result })
      });
    });
  });
});
