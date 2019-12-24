import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionPromoteChatMember } from "../../types/iActionPromoteChatMember";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStatePromoteChatMemberQuery } from "../../types/iStatePromoteChatMemberQuery";
import * as actions from "../actions";
import * as epic from "../epics/promoteChatMember";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";

describe("promoteChatMember epic", (): void => {
  const error: Error = new Error("");
  const query: IStatePromoteChatMemberQuery = {
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

  let locales: ILocale;

  beforeAll(
    async (): Promise<void> => {
      locales = await locale("en");
    }
  );

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
      const action$: ColdObservable<IActionPromoteChatMember> = cold("-a", {
        a: actions.promoteChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
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
        a: actions.promoteChatMember.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionPromoteChatMember | IActionPromoteChatMember
      > = epic.promoteChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.promoteChatMember.error({
          error: new Error(
            locales.find("actionPromoteChatMemberQueryUndefined")
          )
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
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionPromoteChatMember> = epic.promoteChatMember(
        action$,
        state$,
        dependencies
      );
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
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionPromoteChatMember> = epic.promoteChatMember(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.promoteChatMember.result({ result })
      });
    });
  });
});
