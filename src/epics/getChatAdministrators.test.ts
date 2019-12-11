import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionGetChatAdministrators } from "../../types/iActionGetChatAdministrators";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateGetChatAdministratorsQuery } from "../../types/iStateGetChatAdministratorsQuery";
import { IChatMember } from "../../types/telegramBot/types/iChatMember";
import * as actions from "../actions";
import * as epic from "../epics/getChatAdministrators";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";

describe("getChatAdministrators epic", (): void => {
  const locales: ILocale = locale("en");
  const error: Error = new Error("");
  const query: IStateGetChatAdministratorsQuery = {
    chat_id: 0
  };
  const result: IChatMember[] = [
    {
      status: "",
      user: {
        first_name: "",
        id: 0,
        is_bot: false
      }
    }
  ];
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
      const action$: ColdObservable<IActionGetChatAdministrators> = cold("-a", {
        a: actions.getChatAdministrators.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionGetChatAdministrators | IActionGetChatAdministrators
      > = epic.getChatAdministrators(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.getChatAdministrators.error({ error })
      });
    });
  });

  test("should handle error actionGetChatAdministratorsQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionGetChatAdministrators> = cold("-a", {
        a: actions.getChatAdministrators.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionGetChatAdministrators | IActionGetChatAdministrators
      > = epic.getChatAdministrators(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.getChatAdministrators.error({
          error: new Error(
            locales.find("actionGetChatAdministratorsQueryUndefined")
          )
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatAdministrators> = cold("-a", {
        a: actions.getChatAdministrators.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionGetChatAdministrators> = epic.getChatAdministrators(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.getChatAdministrators.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionGetChatAdministrators> = cold("-a", {
        a: actions.getChatAdministrators.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionGetChatAdministrators> = epic.getChatAdministrators(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.getChatAdministrators.result({ result })
      });
    });
  });
});
