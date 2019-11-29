import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionEditMessageReplyMarkup } from "../../types/iActionEditMessageReplyMarkup";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateEditMessageReplyMarkupQuery } from "../../types/iStateEditMessageReplyMarkupQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/editMessageReplyMarkup";
import { initialDependencies } from "../utils/dependencies";

describe("editMessageReplyMarkup epic", (): void => {
  const error: Error = new Error("");
  const query: IStateEditMessageReplyMarkupQuery = {};
  const result: IMessage = {
    chat: {
      id: 0,
      type: ""
    },
    date: 0,
    message_id: 0
  };
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
      const action$: ColdObservable<IActionEditMessageReplyMarkup> = cold(
        "-a",
        {
          a: actions.editMessageReplyMarkup.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionEditMessageReplyMarkup | IActionEditMessageReplyMarkup
      > = epic.editMessageReplyMarkup(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.editMessageReplyMarkup.error({ error })
      });
    });
  });

  test("should handle error actionEditMessageReplyMarkupQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionEditMessageReplyMarkup> = cold("-a", {
        a: actions.editMessageReplyMarkup.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionEditMessageReplyMarkup | IActionEditMessageReplyMarkup
      > = epic.editMessageReplyMarkup(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.editMessageReplyMarkup.error({
          error: new Error(texts.actionEditMessageReplyMarkupQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionEditMessageReplyMarkup> = cold(
        "-a",
        {
          a: actions.editMessageReplyMarkup.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionEditMessageReplyMarkup> = epic.editMessageReplyMarkup(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.editMessageReplyMarkup.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionEditMessageReplyMarkup> = cold(
        "-a",
        {
          a: actions.editMessageReplyMarkup.query({ query })
        }
      );
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionEditMessageReplyMarkup> = epic.editMessageReplyMarkup(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.editMessageReplyMarkup.result({ result })
      });
    });
  });
});
