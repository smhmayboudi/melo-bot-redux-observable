import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionGetChatMembersCount } from "../../types/iActionGetChatMembersCount";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateGetChatMembersCountQuery } from "../../types/iStateGetChatMembersCountQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/getChatMembersCount";
import { initialDependencies } from "../utils/dependencies";

describe("getChatMembersCount epic", (): void => {
  const error: Error = new Error("");
  const query: IStateGetChatMembersCountQuery = {
    chat_id: 0
  };
  const result = 0;
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
      const action$: ColdObservable<IActionGetChatMembersCount> = cold("-a", {
        a: actions.getChatMembersCount.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionGetChatMembersCount | IActionGetChatMembersCount
      > = epic.getChatMembersCount(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.getChatMembersCount.error({ error })
      });
    });
  });

  test("should handle error actionGetChatMembersCountQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionGetChatMembersCount> = cold("-a", {
        a: actions.getChatMembersCount.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionGetChatMembersCount | IActionGetChatMembersCount
      > = epic.getChatMembersCount(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.getChatMembersCount.error({
          error: new Error(texts.actionGetChatMembersCountQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatMembersCount> = cold("-a", {
        a: actions.getChatMembersCount.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionGetChatMembersCount> = epic.getChatMembersCount(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.getChatMembersCount.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatMembersCount> = cold("-a", {
        a: actions.getChatMembersCount.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionGetChatMembersCount> = epic.getChatMembersCount(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.getChatMembersCount.result({ result })
      });
    });
  });
});
