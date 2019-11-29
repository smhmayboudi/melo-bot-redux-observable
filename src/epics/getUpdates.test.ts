import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionGetUpdates } from "../../types/iActionGetUpdates";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateGetUpdatesQuery } from "../../types/iStateGetUpdatesQuery";
import { IUpdate } from "../../types/telegramBot/updates/iUpdate";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/getUpdates";
import { initialDependencies } from "../utils/dependencies";

describe("getUpdates epic", (): void => {
  const error: Error = new Error("");
  const query: IStateGetUpdatesQuery = {};
  const result: IUpdate[] = [{ update_id: 0 }];
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
      const action$: ColdObservable<IActionGetUpdates> = cold("-a", {
        a: actions.getUpdates.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionGetUpdates | IActionGetUpdates
      > = epic.getUpdates(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.getUpdates.error({ error })
      });
    });
  });

  test("should handle error actionGetUpdatesQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionGetUpdates> = cold("-a", {
        a: actions.getUpdates.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionGetUpdates | IActionGetUpdates
      > = epic.getUpdates(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.getUpdates.error({
          error: new Error(texts.actionGetUpdatesQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetUpdates> = cold("-a", {
        a: actions.getUpdates.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionGetUpdates> = epic.getUpdates(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.getUpdates.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetUpdates> = cold("-a", {
        a: actions.getUpdates.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionGetUpdates> = epic.getUpdates(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.getUpdates.result({ result })
      });
    });
  });
});
