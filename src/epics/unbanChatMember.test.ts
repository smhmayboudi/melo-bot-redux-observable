import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionUnbanChatMember } from "../../types/iActionUnbanChatMember";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateUnbanChatMemberQuery } from "../../types/iStateUnbanChatMemberQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/unbanChatMember";
import { initialDependencies } from "../utils/dependencies";

describe("unbanChatMember epic", (): void => {
  const error: Error = new Error("");
  const query: IStateUnbanChatMemberQuery = {
    chat_id: 0,
    user_id: 0
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
      const action$: ColdObservable<IActionUnbanChatMember> = cold("-a", {
        a: actions.unbanChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionUnbanChatMember | IActionUnbanChatMember
      > = epic.unbanChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.unbanChatMember.error({ error })
      });
    });
  });

  test("should handle error actionUnbanChatMemberQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionUnbanChatMember> = cold("-a", {
        a: actions.unbanChatMember.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionUnbanChatMember | IActionUnbanChatMember
      > = epic.unbanChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.unbanChatMember.error({
          error: new Error(texts.actionUnbanChatMemberQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionUnbanChatMember> = cold("-a", {
        a: actions.unbanChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionUnbanChatMember> = epic.unbanChatMember(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.unbanChatMember.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionUnbanChatMember> = cold("-a", {
        a: actions.unbanChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionUnbanChatMember> = epic.unbanChatMember(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.unbanChatMember.result({ result })
      });
    });
  });
});
