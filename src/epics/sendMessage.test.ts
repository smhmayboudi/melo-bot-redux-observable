import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateSendMessageQuery } from "../../types/iStateSendMessageQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as action from "../actions/sendMessage";
import * as texts from "../config/texts";
import * as epic from "../epics/sendMessage";

describe("sendMessage epic", (): void => {
  const error: Error = new Error("");
  const query: IStateSendMessageQuery = {
    chat_id: 0,
    text: ""
  };
  const result: IMessage = {
    chat: {
      id: 0,
      type: "private"
    },
    date: 0,
    message_id: 0
  };
  const resultOKF: IResponse = {
    description: "",
    error_code: 400,
    ok: false
  };
  const resultOKT: IResponse = {
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
      const action$: ColdObservable<IActionSendMessage> = cold("-a", {
        a: action.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: undefined,
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", {
            a: resultOKT
          })
      };
      const output$: Observable<IActionSendMessage> = epic.sendMessage(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: action.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendMessage> = cold("-a", {
        a: action.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: undefined
      };
      const output$: Observable<IActionSendMessage> = epic.sendMessage(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: action.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendMessage> = cold("-a", {
        a: action.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<IActionSendMessage> = epic.sendMessage(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: action.error({
          error
        })
      });
    });
  });

  test("should handle error actionSendMessageQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendMessage> = cold("-a", {
        a: action.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", {
            a: resultOKT
          })
      };
      const output$: Observable<IActionSendMessage> = epic.sendMessage(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: action.error({
          error: new Error(texts.actionSendMessageQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendMessage> = cold("-a", {
        a: action.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", {
            a: resultOKF
          })
      };
      const output$: Observable<IActionSendMessage> = epic.sendMessage(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: action.error({
          error: resultOKF
        })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendMessage> = cold("-a", {
        a: action.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", {
            a: resultOKT
          })
      };
      const output$: Observable<IActionSendMessage> = epic.sendMessage(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: action.result({
          result
        })
      });
    });
  });
});
