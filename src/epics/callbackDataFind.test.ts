import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionCallbackDataFind } from "../../types/iActionCallbackDataFind";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateCallbackDataFindQuery } from "../../types/iStateCallbackDataFindQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/callbackDataFind";

describe("callbackDataFind epic", (): void => {
  const error: Error = new Error("");
  const query: IStateCallbackDataFindQuery = {
    id: "",
    pageToken: ""
  };
  const result = {};
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
      const action$: ColdObservable<IActionCallbackDataFind> = cold("-a", {
        a: actions.callbackDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: undefined,
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionCallbackDataFind | IActionCallbackDataFind
      > = epic.callbackDataFind(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.callbackDataFind.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackDataFind> = cold("-a", {
        a: actions.callbackDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: undefined
      };
      const output$: Observable<
        IActionCallbackDataFind | IActionCallbackDataFind
      > = epic.callbackDataFind(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.callbackDataFind.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackDataFind> = cold("-a", {
        a: actions.callbackDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionCallbackDataFind | IActionCallbackDataFind
      > = epic.callbackDataFind(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.callbackDataFind.error({ error })
      });
    });
  });

  test("should handle error actionCallbackDataFindQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionCallbackDataFind> = cold("-a", {
        a: actions.callbackDataFind.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionCallbackDataFind | IActionCallbackDataFind
      > = epic.callbackDataFind(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.callbackDataFind.error({
          error: new Error(texts.actionCallbackDataFindQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackDataFind> = cold("-a", {
        a: actions.callbackDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<
        IActionCallbackDataFind
      > = epic.callbackDataFind(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.callbackDataFind.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackDataFind> = cold("-a", {
        a: actions.callbackDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<
        IActionCallbackDataFind
      > = epic.callbackDataFind(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.callbackDataFind.result({ result })
      });
    });
  });
});
