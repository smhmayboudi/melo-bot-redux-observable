import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionUnpinChatMessage } from "../../types/iActionUnpinChatMessage";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateUnpinChatMessageQuery } from "../../types/iStateUnpinChatMessageQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/unpinChatMessage";
import { initialDependencies } from "../utils/dependencies";

describe("unpinChatMessage epic", (): void => {
  const error: Error = new Error("");
  const query: IStateUnpinChatMessageQuery = {
    chat_id: 0
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
      const action$: ColdObservable<IActionUnpinChatMessage> = cold("-a", {
        a: actions.unpinChatMessage.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionUnpinChatMessage | IActionUnpinChatMessage
      > = epic.unpinChatMessage(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.unpinChatMessage.error({ error })
      });
    });
  });

  test("should handle error actionUnpinChatMessageQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionUnpinChatMessage> = cold("-a", {
        a: actions.unpinChatMessage.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionUnpinChatMessage | IActionUnpinChatMessage
      > = epic.unpinChatMessage(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.unpinChatMessage.error({
          error: new Error(texts.actionUnpinChatMessageQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionUnpinChatMessage> = cold("-a", {
        a: actions.unpinChatMessage.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionUnpinChatMessage> = epic.unpinChatMessage(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.unpinChatMessage.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionUnpinChatMessage> = cold("-a", {
        a: actions.unpinChatMessage.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionUnpinChatMessage> = epic.unpinChatMessage(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.unpinChatMessage.result({ result })
      });
    });
  });
});
