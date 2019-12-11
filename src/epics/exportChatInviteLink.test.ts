import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionExportChatInviteLink } from "../../types/iActionExportChatInviteLink";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateExportChatInviteLinkQuery } from "../../types/iStateExportChatInviteLinkQuery";
import * as actions from "../actions";
import * as epic from "../epics/exportChatInviteLink";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";

describe("exportChatInviteLink epic", (): void => {
  const locales: ILocale = locale("en");
  const error: Error = new Error("");
  const query: IStateExportChatInviteLinkQuery = {
    chat_id: 0
  };
  const result = "";
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
      const action$: ColdObservable<IActionExportChatInviteLink> = cold("-a", {
        a: actions.exportChatInviteLink.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionExportChatInviteLink | IActionExportChatInviteLink
      > = epic.exportChatInviteLink(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.exportChatInviteLink.error({ error })
      });
    });
  });

  test("should handle error actionExportChatInviteLinkQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionExportChatInviteLink> = cold("-a", {
        a: actions.exportChatInviteLink.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionExportChatInviteLink | IActionExportChatInviteLink
      > = epic.exportChatInviteLink(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.exportChatInviteLink.error({
          error: new Error(
            locales.find("actionExportChatInviteLinkQueryUndefined")
          )
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionExportChatInviteLink> = cold("-a", {
        a: actions.exportChatInviteLink.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionExportChatInviteLink> = epic.exportChatInviteLink(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.exportChatInviteLink.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionExportChatInviteLink> = cold("-a", {
        a: actions.exportChatInviteLink.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies,
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionExportChatInviteLink> = epic.exportChatInviteLink(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.exportChatInviteLink.result({ result })
      });
    });
  });
});
