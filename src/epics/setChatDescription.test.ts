import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionSetChatDescription } from "../../types/iActionSetChatDescription";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateSetChatDescriptionQuery } from "../../types/iStateSetChatDescriptionQuery";
import * as actions from "../actions";
import * as epic from "../epics/setChatDescription";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";

describe("setChatDescription epic", (): void => {
  const locales: ILocale = locale("en");
  const error: Error = new Error("");
  const query: IStateSetChatDescriptionQuery = {
    chat_id: 0
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
      const action$: ColdObservable<IActionSetChatDescription> = cold("-a", {
        a: actions.setChatDescription.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionSetChatDescription | IActionSetChatDescription
      > = epic.setChatDescription(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.setChatDescription.error({ error })
      });
    });
  });

  test("should handle error actionSetChatDescriptionQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionSetChatDescription> = cold("-a", {
        a: actions.setChatDescription.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionSetChatDescription | IActionSetChatDescription
      > = epic.setChatDescription(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.setChatDescription.error({
          error: new Error(
            locales.find("actionSetChatDescriptionQueryUndefined")
          )
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSetChatDescription> = cold("-a", {
        a: actions.setChatDescription.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionSetChatDescription> = epic.setChatDescription(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.setChatDescription.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSetChatDescription> = cold("-a", {
        a: actions.setChatDescription.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionSetChatDescription> = epic.setChatDescription(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.setChatDescription.result({ result })
      });
    });
  });
});
