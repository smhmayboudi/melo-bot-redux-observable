import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionAnswerInlineQuery } from "../../types/iActionAnswerInlineQuery";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateAnswerInlineQueryQuery } from "../../types/iStateAnswerInlineQueryQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/answerInlineQuery";

describe("answerInlineQuery epic", (): void => {
  const error: Error = new Error("");
  const query: IStateAnswerInlineQueryQuery = {
    inline_query_id: "0",
    results: [
      {
        description: "",
        hide_url: false,
        id: "",
        input_message_content: {
          disable_web_page_preview: false,
          message_text: "",
          parse_mode: ""
        },
        // Reply_markup?: IInlineKeyboardMarkup,
        thumb_height: 0,
        thumb_url: "",
        thumb_width: 0,
        title: "",
        type: "",
        url: ""
      }
    ],
    switch_pm_parameter: "",
    switch_pm_text: ""
  };
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
      const action$: ColdObservable<IActionAnswerInlineQuery> = cold("-a", {
        a: actions.answerInlineQuery.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: undefined,
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionAnswerInlineQuery | IActionAnswerInlineQuery
      > = epic.answerInlineQuery(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.answerInlineQuery.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionAnswerInlineQuery> = cold("-a", {
        a: actions.answerInlineQuery.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: undefined
      };
      const output$: Observable<
        IActionAnswerInlineQuery | IActionAnswerInlineQuery
      > = epic.answerInlineQuery(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.answerInlineQuery.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionAnswerInlineQuery> = cold("-a", {
        a: actions.answerInlineQuery.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionAnswerInlineQuery | IActionAnswerInlineQuery
      > = epic.answerInlineQuery(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.answerInlineQuery.error({ error })
      });
    });
  });

  test("should handle error actionAnswerInlineQueryQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionAnswerInlineQuery> = cold("-a", {
        a: actions.answerInlineQuery.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionAnswerInlineQuery | IActionAnswerInlineQuery
      > = epic.answerInlineQuery(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.answerInlineQuery.error({
          error: new Error(texts.actionAnswerInlineQueryQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionAnswerInlineQuery> = cold("-a", {
        a: actions.answerInlineQuery.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<
        IActionAnswerInlineQuery
      > = epic.answerInlineQuery(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.answerInlineQuery.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionAnswerInlineQuery> = cold("-a", {
        a: actions.answerInlineQuery.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<
        IActionAnswerInlineQuery
      > = epic.answerInlineQuery(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.answerInlineQuery.result({ result })
      });
    });
  });
});
