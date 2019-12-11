import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionSetPassportDataErrors } from "../../types/iActionSetPassportDataErrors";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateSetPassportDataErrorsQuery } from "../../types/iStateSetPassportDataErrorsQuery";
import * as actions from "../actions";
import * as epic from "../epics/setPassportDataErrors";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";

describe("setPassportDataErrors epic", (): void => {
  const locales: ILocale = locale("en");
  const error: Error = new Error("");
  const query: IStateSetPassportDataErrorsQuery = {
    errors: [
      {
        data_hash: "",
        field_name: "",
        message: "",
        source: "",
        type: ""
      }
    ],
    user_id: 0
  };
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
      const action$: ColdObservable<IActionSetPassportDataErrors> = cold("-a", {
        a: actions.setPassportDataErrors.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionSetPassportDataErrors | IActionSetPassportDataErrors
      > = epic.setPassportDataErrors(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.setPassportDataErrors.error({ error })
      });
    });
  });

  test("should handle error actionSetPassportDataErrorsQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionSetPassportDataErrors> = cold("-a", {
        a: actions.setPassportDataErrors.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionSetPassportDataErrors | IActionSetPassportDataErrors
      > = epic.setPassportDataErrors(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.setPassportDataErrors.error({
          error: new Error(
            locales.find("actionSetPassportDataErrorsQueryUndefined")
          )
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSetPassportDataErrors> = cold("-a", {
        a: actions.setPassportDataErrors.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionSetPassportDataErrors> = epic.setPassportDataErrors(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.setPassportDataErrors.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSetPassportDataErrors> = cold("-a", {
        a: actions.setPassportDataErrors.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionSetPassportDataErrors> = epic.setPassportDataErrors(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.setPassportDataErrors.result({ result })
      });
    });
  });
});
