import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionRestrictChatMember } from "../../types/iActionRestrictChatMember";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateRestrictChatMemberQuery } from "../../types/iStateRestrictChatMemberQuery";
import * as actions from "../actions";
import * as epic from "../epics/restrictChatMember";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";

describe("restrictChatMember epic", (): void => {
  const error: Error = new Error("");
  const query: IStateRestrictChatMemberQuery = {
    chat_id: 0,
    permissions: {},
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
      const action$: ColdObservable<IActionRestrictChatMember> = cold("-a", {
        a: actions.restrictChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionRestrictChatMember | IActionRestrictChatMember
      > = epic.restrictChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.restrictChatMember.error({ error })
      });
    });
  });

  test("should handle error actionRestrictChatMemberQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionRestrictChatMember> = cold("-a", {
        a: actions.restrictChatMember.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionRestrictChatMember | IActionRestrictChatMember
      > = epic.restrictChatMember(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.restrictChatMember.error({
          error: new Error(
            locales.find("actionRestrictChatMemberQueryUndefined")
          )
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionRestrictChatMember> = cold("-a", {
        a: actions.restrictChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionRestrictChatMember> = epic.restrictChatMember(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.restrictChatMember.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionRestrictChatMember> = cold("-a", {
        a: actions.restrictChatMember.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionRestrictChatMember> = epic.restrictChatMember(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.restrictChatMember.result({ result })
      });
    });
  });
});
