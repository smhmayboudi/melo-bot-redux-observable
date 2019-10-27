import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionPromoteChatMember } from "../../types/iActionPromoteChatMember";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStatePromoteChatMemberQuery } from "../../types/iStatePromoteChatMemberQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/promoteChatMember";

describe("promoteChatMember epic", (): void => {
  const error: Error = new Error("");
  const query: IStatePromoteChatMemberQuery = {
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
      const action$: ColdObservable<IActionPromoteChatMember> = cold("-a", {
        a: actions.promoteChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: undefined,
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionPromoteChatMember | IActionPromoteChatMember
      > = epic.promoteChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.promoteChatMember.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionPromoteChatMember> = cold("-a", {
        a: actions.promoteChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: undefined
      };
      const output$: Observable<
        IActionPromoteChatMember | IActionPromoteChatMember
      > = epic.promoteChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.promoteChatMember.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionPromoteChatMember> = cold("-a", {
        a: actions.promoteChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionPromoteChatMember | IActionPromoteChatMember
      > = epic.promoteChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.promoteChatMember.error({ error })
      });
    });
  });

  test("should handle error actionPromoteChatMemberQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionPromoteChatMember> = cold("-a", {
        a: actions.promoteChatMember.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionPromoteChatMember | IActionPromoteChatMember
      > = epic.promoteChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.promoteChatMember.error({
          error: new Error(texts.actionPromoteChatMemberQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionPromoteChatMember> = cold("-a", {
        a: actions.promoteChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<
        IActionPromoteChatMember
      > = epic.promoteChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.promoteChatMember.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionPromoteChatMember> = cold("-a", {
        a: actions.promoteChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<
        IActionPromoteChatMember
      > = epic.promoteChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.promoteChatMember.result({ result })
      });
    });
  });
});
