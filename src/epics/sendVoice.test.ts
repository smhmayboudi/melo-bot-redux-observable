import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionSendVoice } from "../../types/iActionSendVoice";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateSendVoiceQuery } from "../../types/iStateSendVoiceQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as epic from "../epics/sendVoice";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";

describe("sendVoice epic", (): void => {
  const locales: ILocale = locale("en");
  const error: Error = new Error("");
  const query: IStateSendVoiceQuery = {
    chat_id: 0,
    voice: ""
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

  test("should handle dependency requestsUploadObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVoice> = cold("-a", {
        a: actions.sendVoice.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--#", {}, error)
      };
      const output$: Observable<
        IActionSendVoice | IActionSendVoice
      > = epic.sendVoice(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.sendVoice.error({ error })
      });
    });
  });

  test("should handle error actionSendVoiceQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionSendVoice> = cold("-a", {
        a: actions.sendVoice.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionSendVoice | IActionSendVoice
      > = epic.sendVoice(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.sendVoice.error({
          error: new Error(locales.find("actionSendVoiceQueryUndefined"))
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVoice> = cold("-a", {
        a: actions.sendVoice.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionSendVoice> = epic.sendVoice(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.sendVoice.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVoice> = cold("-a", {
        a: actions.sendVoice.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionSendVoice> = epic.sendVoice(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.sendVoice.result({ result })
      });
    });
  });
});
