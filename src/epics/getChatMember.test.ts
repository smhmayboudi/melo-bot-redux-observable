import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionGetChatMember } from "../../types/iActionGetChatMember";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateGetChatMemberQuery } from "../../types/iStateGetChatMemberQuery";
import { IChatMember } from "../../types/telegramBot/types/iChatMember";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/getChatMember";
import { initialDependencies } from "../utils/dependencies";

describe("getChatMember epic", (): void => {
  const error: Error = new Error("");
  const query: IStateGetChatMemberQuery = {
    chat_id: 0,
    user_id: 0
  };
  const result: IChatMember = {
    status: "",
    user: {
      first_name: "",
      id: 0,
      is_bot: false
    }
  };
  const responseOKF: IResponse = {
    description: "Bad Request: CHAT_ADMIN_REQUIRED",
    error_code: 400,
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
      const action$: ColdObservable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionGetChatMember | IActionGetChatMember
      > = epic.getChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.getChatMember.error({ error })
      });
    });
  });

  test("should handle error actionGetChatMemberQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionGetChatMember | IActionGetChatMember
      > = epic.getChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.getChatMember.error({
          error: new Error(texts.actionGetChatMemberQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionGetChatMember> = epic.getChatMember(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.getChatMember.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatMember> = cold("-a", {
        a: actions.getChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initialDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionGetChatMember> = epic.getChatMember(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.getChatMember.result({ result })
      });
    });
  });
});
