import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionGetWebhookInfo } from "../../types/iActionGetWebhookInfo";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateGetWebhookInfoQuery } from "../../types/iStateGetWebhookInfoQuery";
import { IWebhookInfo } from "../../types/telegramBot/updates/iWebhookInfo";
import * as actions from "../actions";
import * as epic from "../epics/getWebhookInfo";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";

describe("getWebhookInfo epic", (): void => {
  const error: Error = new Error("");
  const query: IStateGetWebhookInfoQuery = {};
  const result: IWebhookInfo = {
    has_custom_certificate: true,
    pending_update_count: 0,
    url: ""
  };
  const responseOKF: IResponse = {
    ok: false
  };
  const responseOKT: IResponse = {
    ok: true,
    result
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

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetWebhookInfo> = cold("-a", {
        a: actions.getWebhookInfo.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionGetWebhookInfo | IActionGetWebhookInfo
      > = epic.getWebhookInfo(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.getWebhookInfo.error({ error })
      });
    });
  });

  test("should handle error actionGetWebhookInfoQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionGetWebhookInfo> = cold("-a", {
        a: actions.getWebhookInfo.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionGetWebhookInfo | IActionGetWebhookInfo
      > = epic.getWebhookInfo(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.getWebhookInfo.error({
          error: new Error(locales.find("actionGetWebhookInfoQueryUndefined"))
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetWebhookInfo> = cold("-a", {
        a: actions.getWebhookInfo.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionGetWebhookInfo> = epic.getWebhookInfo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.getWebhookInfo.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetWebhookInfo> = cold("-a", {
        a: actions.getWebhookInfo.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionGetWebhookInfo> = epic.getWebhookInfo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.getWebhookInfo.result({ result })
      });
    });
  });
});
