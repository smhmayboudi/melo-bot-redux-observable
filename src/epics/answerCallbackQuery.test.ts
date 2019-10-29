import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionAnswerCallbackQuery } from "../../types/iActionAnswerCallbackQuery";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateAnswerCallbackQueryQuery } from "../../types/iStateAnswerCallbackQueryQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/answerCallbackQuery";

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
      const action$: ColdObservable<IActionAnswerCallbackQuery> = cold("-a", {
        a: actions.answerCallbackQuery.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: undefined,
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionAnswerCallbackQuery | IActionAnswerCallbackQuery
      > = epic.answerCallbackQuery(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.answerCallbackQuery.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionAnswerCallbackQuery> = cold("-a", {
        a: actions.answerCallbackQuery.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: undefined
      };
      const output$: Observable<
        IActionAnswerCallbackQuery | IActionAnswerCallbackQuery
      > = epic.answerCallbackQuery(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.answerCallbackQuery.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      });
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
        a: actions.answerCallbackQuery.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionAnswerCallbackQuery | IActionAnswerCallbackQuery
      > = epic.answerCallbackQuery(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.answerCallbackQuery.error({
          error: new Error(texts.actionAnswerCallbackQueryQueryUndefined)
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
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<
        IActionAnswerCallbackQuery
      > = epic.answerCallbackQuery(action$, state$, dependencies);
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
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<
        IActionAnswerCallbackQuery
      > = epic.answerCallbackQuery(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.answerCallbackQuery.result({ result })
      });
    });
  });
});
