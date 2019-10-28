import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionExportChatInviteLink } from "../../types/iActionExportChatInviteLink";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateExportChatInviteLinkQuery } from "../../types/iStateExportChatInviteLinkQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/exportChatInviteLink";

describe("exportChatInviteLink epic", (): void => {
  const error: Error = new Error("");
  const query: IStateExportChatInviteLinkQuery = {
    chat_id: 0
  };
  const result: string = "";
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
      const action$: ColdObservable<IActionExportChatInviteLink> = cold("-a", {
        a: actions.exportChatInviteLink.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: undefined,
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionExportChatInviteLink | IActionExportChatInviteLink
      > = epic.exportChatInviteLink(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.exportChatInviteLink.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionExportChatInviteLink> = cold("-a", {
        a: actions.exportChatInviteLink.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: undefined
      };
      const output$: Observable<
        IActionExportChatInviteLink | IActionExportChatInviteLink
      > = epic.exportChatInviteLink(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.exportChatInviteLink.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      });
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
        a: actions.exportChatInviteLink.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionExportChatInviteLink | IActionExportChatInviteLink
      > = epic.exportChatInviteLink(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.exportChatInviteLink.error({
          error: new Error(texts.actionExportChatInviteLinkQueryUndefined)
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
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<
        IActionExportChatInviteLink
      > = epic.exportChatInviteLink(action$, state$, dependencies);
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
        botToken: "",
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<
        IActionExportChatInviteLink
      > = epic.exportChatInviteLink(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.exportChatInviteLink.result({ result })
      });
    });
  });
});
