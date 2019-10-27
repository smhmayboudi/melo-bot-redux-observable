import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionGetChatAdministrators } from "../../types/iActionGetChatAdministrators";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateGetChatAdministratorsQuery } from "../../types/iStateGetChatAdministratorsQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/getChatAdministrators";

describe("getChatAdministrators epic", (): void => {
  const error: Error = new Error("");
  const query: IStateGetChatAdministratorsQuery = {
    // TODO: fill it
  };
  // TODO: check it
  const result: boolean = true;
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
      const action$: ColdObservable<IActionGetChatAdministrators> = cold("-a", {
        a: actions.getChatAdministrators.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: undefined,
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionGetChatAdministrators | IActionGetChatAdministrators
      > = epic.getChatAdministrators(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.getChatAdministrators.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatAdministrators> = cold("-a", {
        a: actions.getChatAdministrators.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: undefined
      };
      const output$: Observable<
        IActionGetChatAdministrators | IActionGetChatAdministrators
      > = epic.getChatAdministrators(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.getChatAdministrators.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatAdministrators> = cold("-a", {
        a: actions.getChatAdministrators.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionGetChatAdministrators | IActionGetChatAdministrators
      > = epic.getChatAdministrators(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.getChatAdministrators.error({ error })
      });
    });
  });

  test("should handle error actionGetChatAdministratorsQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionGetChatAdministrators> = cold("-a", {
        a: actions.getChatAdministrators.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionGetChatAdministrators | IActionGetChatAdministrators
      > = epic.getChatAdministrators(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.getChatAdministrators.error({
          error: new Error(texts.actionGetChatAdministratorsQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatAdministrators> = cold("-a", {
        a: actions.getChatAdministrators.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<
        IActionGetChatAdministrators
      > = epic.getChatAdministrators(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.getChatAdministrators.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatAdministrators> = cold("-a", {
        a: actions.getChatAdministrators.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<
        IActionGetChatAdministrators
      > = epic.getChatAdministrators(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.getChatAdministrators.result({ result })
      });
    });
  });
});
