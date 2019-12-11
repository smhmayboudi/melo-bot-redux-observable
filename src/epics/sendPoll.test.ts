import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionSendPoll } from "../../types/iActionSendPoll";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateSendPollQuery } from "../../types/iStateSendPollQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as epic from "../epics/sendPoll";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";

describe("sendPoll epic", (): void => {
  const locales: ILocale = locale("en");
  const error: Error = new Error("");
  const query: IStateSendPollQuery = {
    chat_id: 0,
    options: [""],
    question: ""
  };
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
      const action$: ColdObservable<IActionSendPoll> = cold("-a", {
        a: actions.sendPoll.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionSendPoll | IActionSendPoll
      > = epic.sendPoll(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.sendPoll.error({ error })
      });
    });
  });

  test("should handle error actionSendPollQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionSendPoll> = cold("-a", {
        a: actions.sendPoll.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionSendPoll | IActionSendPoll
      > = epic.sendPoll(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.sendPoll.error({
          error: new Error(locales.find("actionSendPollQueryUndefined"))
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendPoll> = cold("-a", {
        a: actions.sendPoll.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionSendPoll> = epic.sendPoll(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.sendPoll.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendPoll> = cold("-a", {
        a: actions.sendPoll.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionSendPoll> = epic.sendPoll(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.sendPoll.result({ result })
      });
    });
  });
});
