import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionAnswerShippingQuery } from "../../types/iActionAnswerShippingQuery";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateAnswerShippingQueryQuery } from "../../types/iStateAnswerShippingQueryQuery";
import * as actions from "../actions";
import * as epic from "../epics/answerShippingQuery";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";

describe("answerShippingQuery epic", (): void => {
  const error: Error = new Error("");
  const query: IStateAnswerShippingQueryQuery = {
    error_message: "",
    ok: false,
    shipping_options: [
      {
        id: "",
        prices: [
          {
            amount: 0,
            label: ""
          }
        ],
        title: ""
      }
    ],
    shipping_query_id: ""
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
      const action$: ColdObservable<IActionAnswerShippingQuery> = cold("-a", {
        a: actions.answerShippingQuery.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionAnswerShippingQuery | IActionAnswerShippingQuery
      > = epic.answerShippingQuery(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.answerShippingQuery.error({ error })
      });
    });
  });

  test("should handle error actionAnswerShippingQueryQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionAnswerShippingQuery> = cold("-a", {
        a: actions.answerShippingQuery.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionAnswerShippingQuery | IActionAnswerShippingQuery
      > = epic.answerShippingQuery(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.answerShippingQuery.error({
          error: new Error(
            locales.find("actionAnswerShippingQueryQueryUndefined")
          )
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionAnswerShippingQuery> = cold("-a", {
        a: actions.answerShippingQuery.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionAnswerShippingQuery> = epic.answerShippingQuery(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.answerShippingQuery.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionAnswerShippingQuery> = cold("-a", {
        a: actions.answerShippingQuery.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionAnswerShippingQuery> = epic.answerShippingQuery(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.answerShippingQuery.result({ result })
      });
    });
  });
});
