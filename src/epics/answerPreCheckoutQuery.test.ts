import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionAnswerPreCheckoutQuery } from "../../types/iActionAnswerPreCheckoutQuery";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateAnswerPreCheckoutQueryQuery } from "../../types/iStateAnswerPreCheckoutQueryQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/answerPreCheckoutQuery";

describe("answerPreCheckoutQuery epic", (): void => {
  const error: Error = new Error("");
  const query: IStateAnswerPreCheckoutQueryQuery = {
    ok: false,
    pre_checkout_query_id: ""
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
      const action$: ColdObservable<IActionAnswerPreCheckoutQuery> = cold(
        "-a",
        {
          a: actions.answerPreCheckoutQuery.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: undefined,
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionAnswerPreCheckoutQuery | IActionAnswerPreCheckoutQuery
      > = epic.answerPreCheckoutQuery(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.answerPreCheckoutQuery.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionAnswerPreCheckoutQuery> = cold(
        "-a",
        {
          a: actions.answerPreCheckoutQuery.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: undefined
      };
      const output$: Observable<
        IActionAnswerPreCheckoutQuery | IActionAnswerPreCheckoutQuery
      > = epic.answerPreCheckoutQuery(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.answerPreCheckoutQuery.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionAnswerPreCheckoutQuery> = cold(
        "-a",
        {
          a: actions.answerPreCheckoutQuery.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionAnswerPreCheckoutQuery | IActionAnswerPreCheckoutQuery
      > = epic.answerPreCheckoutQuery(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.answerPreCheckoutQuery.error({ error })
      });
    });
  });

  test("should handle error actionAnswerPreCheckoutQueryQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionAnswerPreCheckoutQuery> = cold("-a", {
        a: actions.answerPreCheckoutQuery.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionAnswerPreCheckoutQuery | IActionAnswerPreCheckoutQuery
      > = epic.answerPreCheckoutQuery(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.answerPreCheckoutQuery.error({
          error: new Error(texts.actionAnswerPreCheckoutQueryQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionAnswerPreCheckoutQuery> = cold(
        "-a",
        {
          a: actions.answerPreCheckoutQuery.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionAnswerPreCheckoutQuery> = epic.answerPreCheckoutQuery(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.answerPreCheckoutQuery.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionAnswerPreCheckoutQuery> = cold(
        "-a",
        {
          a: actions.answerPreCheckoutQuery.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionAnswerPreCheckoutQuery> = epic.answerPreCheckoutQuery(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.answerPreCheckoutQuery.result({ result })
      });
    });
  });
});
