import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionPinChatMessage } from "../../types/iActionPinChatMessage";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStatePinChatMessageQuery } from "../../types/iStatePinChatMessageQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/pinChatMessage";
import { initialDependencies } from "../utils/dependencies";

describe("pinChatMessage epic", (): void => {
  const error: Error = new Error("");
  const query: IStatePinChatMessageQuery = {
    chat_id: 0,
    message_id: 0
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
      const action$: ColdObservable<IActionPinChatMessage> = cold("-a", {
        a: actions.pinChatMessage.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionPinChatMessage | IActionPinChatMessage
      > = epic.pinChatMessage(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.pinChatMessage.error({ error })
      });
    });
  });

  test("should handle error actionPinChatMessageQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionPinChatMessage> = cold("-a", {
        a: actions.pinChatMessage.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionPinChatMessage | IActionPinChatMessage
      > = epic.pinChatMessage(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.pinChatMessage.error({
          error: new Error(texts.actionPinChatMessageQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionPinChatMessage> = cold("-a", {
        a: actions.pinChatMessage.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionPinChatMessage> = epic.pinChatMessage(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.pinChatMessage.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionPinChatMessage> = cold("-a", {
        a: actions.pinChatMessage.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionPinChatMessage> = epic.pinChatMessage(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.pinChatMessage.result({ result })
      });
    });
  });
});
