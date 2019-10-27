import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionSendMediaGroup } from "../../types/iActionSendMediaGroup";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateSendMediaGroupQuery } from "../../types/iStateSendMediaGroupQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/sendMediaGroup";

describe("sendMediaGroup epic", (): void => {
  const error: Error = new Error("");
  const query: IStateSendMediaGroupQuery = {
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
      const action$: ColdObservable<IActionSendMediaGroup> = cold("-a", {
        a: actions.sendMediaGroup.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: undefined,
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionSendMediaGroup | IActionSendMediaGroup
      > = epic.sendMediaGroup(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.sendMediaGroup.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendMediaGroup> = cold("-a", {
        a: actions.sendMediaGroup.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: undefined
      };
      const output$: Observable<
        IActionSendMediaGroup | IActionSendMediaGroup
      > = epic.sendMediaGroup(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.sendMediaGroup.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendMediaGroup> = cold("-a", {
        a: actions.sendMediaGroup.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionSendMediaGroup | IActionSendMediaGroup
      > = epic.sendMediaGroup(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.sendMediaGroup.error({ error })
      });
    });
  });

  test("should handle error actionSendMediaGroupQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionSendMediaGroup> = cold("-a", {
        a: actions.sendMediaGroup.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionSendMediaGroup | IActionSendMediaGroup
      > = epic.sendMediaGroup(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.sendMediaGroup.error({
          error: new Error(texts.actionSendMediaGroupQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendMediaGroup> = cold("-a", {
        a: actions.sendMediaGroup.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionSendMediaGroup> = epic.sendMediaGroup(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.sendMediaGroup.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendMediaGroup> = cold("-a", {
        a: actions.sendMediaGroup.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionSendMediaGroup> = epic.sendMediaGroup(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.sendMediaGroup.result({ result })
      });
    });
  });
});
