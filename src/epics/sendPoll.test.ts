import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionSendPoll } from "../../types/iActionSendPoll";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateSendPollQuery } from "../../types/iStateSendPollQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/sendPoll";

describe("sendPoll epic", (): void => {
  const error: Error = new Error("");
  const query: IStateSendPollQuery = {
    // TODO: fill it
  };
  // TODO: check it
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
      const action$: ColdObservable<IActionSendPoll> = cold("-a", {
        a: actions.sendPoll.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: undefined,
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionSendPoll | IActionSendPoll
      > = epic.sendPoll(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.sendPoll.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendPoll> = cold("-a", {
        a: actions.sendPoll.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: undefined
      };
      const output$: Observable<
        IActionSendPoll | IActionSendPoll
      > = epic.sendPoll(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.sendPoll.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      });
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
        a: actions.sendPoll.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionSendPoll | IActionSendPoll
      > = epic.sendPoll(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.sendPoll.error({
          error: new Error(texts.actionSendPollQueryUndefined)
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
