import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionSendVideoNote } from "../../types/iActionSendVideoNote";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateSendVideoNoteQuery } from "../../types/iStateSendVideoNoteQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/sendVideoNote";

describe("sendVideoNote epic", (): void => {
  const error: Error = new Error("");
  const query: IStateSendVideoNoteQuery = {
    chat_id: 0,
    video_note: ""
  };
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
      const action$: ColdObservable<IActionSendVideoNote> = cold("-a", {
        a: actions.sendVideoNote.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: undefined,
        requestsUploadObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionSendVideoNote | IActionSendVideoNote
      > = epic.sendVideoNote(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.sendVideoNote.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsUploadObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideoNote> = cold("-a", {
        a: actions.sendVideoNote.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsUploadObservable: undefined
      };
      const output$: Observable<
        IActionSendVideoNote | IActionSendVideoNote
      > = epic.sendVideoNote(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.sendVideoNote.error({
          error: new Error(
            texts.epicDependencyRequestsUploadObservableUndefined
          )
        })
      });
    });
  });

  test("should handle dependency requestsUploadObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideoNote> = cold("-a", {
        a: actions.sendVideoNote.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--#", {}, error)
      };
      const output$: Observable<
        IActionSendVideoNote | IActionSendVideoNote
      > = epic.sendVideoNote(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.sendVideoNote.error({ error })
      });
    });
  });

  test("should handle error actionSendVideoNoteQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionSendVideoNote> = cold("-a", {
        a: actions.sendVideoNote.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionSendVideoNote | IActionSendVideoNote
      > = epic.sendVideoNote(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.sendVideoNote.error({
          error: new Error(texts.actionSendVideoNoteQueryUndefined)
        })
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideoNote> = cold("-a", {
        a: actions.sendVideoNote.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionSendVideoNote> = epic.sendVideoNote(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.sendVideoNote.error({ error: responseOKF })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideoNote> = cold("-a", {
        a: actions.sendVideoNote.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionSendVideoNote> = epic.sendVideoNote(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.sendVideoNote.result({ result })
      });
    });
  });
});
