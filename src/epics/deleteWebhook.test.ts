import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionDeleteWebhook } from "../../types/iActionDeleteWebhook";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateDeleteWebhookQuery } from "../../types/iStateDeleteWebhookQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/deleteWebhook";
import { initialDependencies } from "../utils/dependencies";

describe("deleteWebhook epic", (): void => {
  const error: Error = new Error("");
  const query: IStateDeleteWebhookQuery = {};
  const result = true;
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

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionDeleteWebhook> = cold("-a", {
        a: actions.deleteWebhook.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionDeleteWebhook | IActionDeleteWebhook
      > = epic.deleteWebhook(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.deleteWebhook.error({ error })
      });
    });
  });

  test("should handle error actionDeleteWebhookQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionDeleteWebhook> = cold("-a", {
        a: actions.deleteWebhook.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionDeleteWebhook | IActionDeleteWebhook
      > = epic.deleteWebhook(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.deleteWebhook.error({
          error: new Error(texts.actionDeleteWebhookQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionDeleteWebhook> = cold("-a", {
        a: actions.deleteWebhook.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionDeleteWebhook> = epic.deleteWebhook(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.deleteWebhook.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionDeleteWebhook> = cold("-a", {
        a: actions.deleteWebhook.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionDeleteWebhook> = epic.deleteWebhook(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.deleteWebhook.result({ result })
      });
    });
  });
});
