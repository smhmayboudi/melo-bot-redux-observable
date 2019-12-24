import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionEditMessageCaption } from "../../types/iActionEditMessageCaption";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateEditMessageCaptionQuery } from "../../types/iStateEditMessageCaptionQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as epic from "../epics/editMessageCaption";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";

describe("editMessageCaption epic", (): void => {
  const error: Error = new Error("");
  const query: IStateEditMessageCaptionQuery = {};
  const result: IMessage = {
    chat: {
      id: 0,
      type: ""
    },
    date: 0,
    message_id: 0
  };
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
      const action$: ColdObservable<IActionEditMessageCaption> = cold("-a", {
        a: actions.editMessageCaption.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionEditMessageCaption | IActionEditMessageCaption
      > = epic.editMessageCaption(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.editMessageCaption.error({ error })
      });
    });
  });

  test("should handle error actionEditMessageCaptionQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionEditMessageCaption> = cold("-a", {
        a: actions.editMessageCaption.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionEditMessageCaption | IActionEditMessageCaption
      > = epic.editMessageCaption(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.editMessageCaption.error({
          error: new Error(
            locales.find("actionEditMessageCaptionQueryUndefined")
          )
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionEditMessageCaption> = cold("-a", {
        a: actions.editMessageCaption.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionEditMessageCaption> = epic.editMessageCaption(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.editMessageCaption.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionEditMessageCaption> = cold("-a", {
        a: actions.editMessageCaption.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales),
        authorization: (): Observable<boolean> => of(true),
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionEditMessageCaption> = epic.editMessageCaption(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.editMessageCaption.result({ result })
      });
    });
  });
});
