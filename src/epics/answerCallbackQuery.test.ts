import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionAnswerCallbackQuery } from "../../types/iActionAnswerCallbackQuery";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateAnswerCallbackQueryQuery } from "../../types/iStateAnswerCallbackQueryQuery";
import * as actions from "../actions";
import * as epic from "../epics/answerCallbackQuery";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";

describe("answerCallbackQuery epic", (): void => {
  const error: Error = new Error("");
  const query: IStateAnswerCallbackQueryQuery = {
    callback_query_id: ""
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
      const action$: ColdObservable<IActionAnswerCallbackQuery> = cold("-a", {
        a: actions.answerCallbackQuery.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionAnswerCallbackQuery | IActionAnswerCallbackQuery
      > = epic.answerCallbackQuery(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.answerCallbackQuery.error({ error })
      });
    });
  });

  test("should handle error actionAnswerCallbackQueryQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionAnswerCallbackQuery> = cold("-a", {
        a: actions.answerCallbackQuery.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionAnswerCallbackQuery | IActionAnswerCallbackQuery
      > = epic.answerCallbackQuery(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.answerCallbackQuery.error({
          error: new Error(
            locales.find("actionAnswerCallbackQueryQueryUndefined")
          )
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionAnswerCallbackQuery> = cold("-a", {
        a: actions.answerCallbackQuery.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionAnswerCallbackQuery> = epic.answerCallbackQuery(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.answerCallbackQuery.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionAnswerCallbackQuery> = cold("-a", {
        a: actions.answerCallbackQuery.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionAnswerCallbackQuery> = epic.answerCallbackQuery(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.answerCallbackQuery.result({ result })
      });
    });
  });
});
